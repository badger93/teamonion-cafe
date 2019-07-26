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
import java.util.stream.Collectors;

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
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_NOT_FOUND);
        }

        return menuRepository.save(menuSaveDto.toEntity(setMenuImagePath(imageFile))).getId();
    }

    Page<Menu> selectAll(Pageable pageable) {
        return menuRepository.findAllByDeletedFalse(pageable);
//        Page<Menu> collect = new Page<Menu>();
//        collect = menuRepository.findAll(pageable).filter(menu -> !menu.isDeleted()).stream().collect(Collectors.toCollection(Page::new));
//        return collect;
    }

    @Transactional
    public void updateMenu(Long id, MenuSaveDto menuSaveDto) {
        checkAdmin();

        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));

        String path = menu.getImagePath();
        MultipartFile imageFile = menuSaveDto.getImageFile();

        // TODO : 파일 서비스 분리 고민
        if (imageFile.getOriginalFilename().isEmpty()) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_NOT_FOUND);
        }

        menu = menuSaveDto.toEntity(setMenuImagePath(menuSaveDto.getImageFile()));
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
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_RENDER_ERROR);
        }
    }

    @Transactional
    void deleteByMenuId(Long id) {
        checkAdmin();

        Menu menu = menuRepository.findById(id).orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
        String path = menu.getImagePath();

        menu.delete();
        menuRepository.save(menu);
        deleteMenuImage(path);
    }

    private void deleteMenuImage(String path) {
        File file = new File(path);

        // TODO : delete() 확인 필요
        if (file.exists()) {
            file.delete();
        }
    }

    List<Menu> selectByName(String name) {
        return menuRepository.findByNameAndDeletedFalse(name);
    }

    private void checkAdmin() {
        if (!jwtComponent.getClaimValueByToken(JwtComponent.ROLE).equals(MemberRole.ADMIN.toString())) {
            log.debug("menuservice - checkadmin fail.. role : {}", jwtComponent.getClaimValueByToken(JwtComponent.ROLE));
            throw new HandleRuntimeException(GlobalExceptionType.UNAUTHORIZED);
        }
    }
}
