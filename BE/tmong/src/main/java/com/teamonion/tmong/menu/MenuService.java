package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import com.teamonion.tmong.member.MemberRole;
import com.teamonion.tmong.security.JwtComponent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MenuService {
    private static final Logger log = LoggerFactory.getLogger(MenuService.class);

    @Value("${download-path}")
    private String DOWNLOAD_PATH;

    @NonNull
    private final MenuRepository menuRepository;

    @NonNull
    private final JwtComponent jwtComponent;

    Long add(MenuSaveDto menuSaveDto) {
        checkAdmin();
        MultipartFile imageFile = menuSaveDto.getImageFile();

        if (imageFile.getOriginalFilename().isEmpty()) {
            throw new HandleRuntimeException(GlobalExceptionType.MENUIMAGE_NOT_FOUND);
        }

        menuSaveDto.setImagePath(setMenuImagePath(imageFile));

        return menuRepository.save(menuSaveDto.toEntity()).getId();
    }

    Page<Menu> selectAll(Pageable pageable) {
        return menuRepository.findAll(pageable);
    }

    Page<Menu> selectAllByAdmin(Pageable pageable) {
        checkAdmin();
        return menuRepository.findAll(pageable);
    }

    @Transactional
    public void updateMenu(Long id, MenuSaveDto menuSaveDto) {
        checkAdmin();
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));

        String path = menu.getImagePath();
        MultipartFile imageFile = menuSaveDto.getImageFile();

        if (imageFile.getOriginalFilename().isEmpty()) {
            throw new HandleRuntimeException(GlobalExceptionType.MENUIMAGE_NOT_FOUND);
        }
        menuSaveDto.setImagePath(setMenuImagePath(menuSaveDto.getImageFile()));
        menu.update(menuSaveDto);
        menuRepository.save(menu);

        deleteMenuImage(path);
    }

    public String setMenuImagePath(MultipartFile imageFile) {
        try {
            int randomString = (int) (Math.random() * 10000) + 1;
            String fileName = System.currentTimeMillis() + "_" + randomString + "_" + imageFile.getOriginalFilename();
            String date = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);

            File file = new File(DOWNLOAD_PATH + date + "/");
            file.mkdirs();

            Path path = Paths.get(DOWNLOAD_PATH + date + "/" + fileName);
            imageFile.transferTo(path);

            return DOWNLOAD_PATH + "/" + fileName;
        } catch (IOException e) {
            //e.getStackTrace();
            throw new HandleRuntimeException(GlobalExceptionType.MENUIMAGE_RENDER_ERROR);
        }
    }

    @Transactional
    void deleteByMenuId(Long id) {
        checkAdmin();
        Menu menu = menuRepository.findById(id).orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
        String path = menu.getImagePath();

        menuRepository.delete(menu);
        deleteMenuImage(path);
    }

    private void deleteMenuImage(String path) {
        File file = new File(path);

        if (file.exists()) {
            file.delete();
        }
    }

    List<Menu> selectByName(String name) {
        return menuRepository.findByName(name);
    }

    private void checkAdmin() {
        if (!jwtComponent.getClaimValueByToken(JwtComponent.ROLE).equals(MemberRole.ADMIN)) {
            throw new HandleRuntimeException(GlobalExceptionType.UNAUTHORIZED);
        }
    }
}
