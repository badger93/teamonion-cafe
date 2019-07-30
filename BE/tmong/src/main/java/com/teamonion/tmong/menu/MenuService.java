package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
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

@RequiredArgsConstructor
@Service
public class MenuService {
    private static final Logger log = LoggerFactory.getLogger(MenuService.class);

    @Value("${download-path}")
    private String downloadPath;

    @NonNull
    private final MenuRepository menuRepository;

    @NonNull
    private final JwtComponent jwtComponent;

    Long add(MenuSaveDto menuSaveDto) {
        jwtComponent.checkAdmin();

        MultipartFile imageFile = menuSaveDto.getImageFile();

        if (imageFile.isEmpty()) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_NOT_FOUND);
        }

        return menuRepository.save(menuSaveDto.toEntity(setMenuImagePath(imageFile))).getId();
    }

    @Transactional
    public void updateMenu(Long id, MenuSaveDto menuSaveDto) {
        jwtComponent.checkAdmin();

        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));

        String path = menu.getImagePath();
        MultipartFile imageFile = menuSaveDto.getImageFile();

        // TODO : 파일 서비스 분리 고민
        if (imageFile.isEmpty()) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_NOT_FOUND);
        }

        menu = menuSaveDto.toEntity(setMenuImagePath(menuSaveDto.getImageFile()));
        menu.update(id);
        menuRepository.save(menu);

        deleteMenuImage(path);
    }

    private String setMenuImagePath(MultipartFile imageFile) {
        checkFileType(imageFile.getContentType());

        try {
            int randomString = (int) (Math.random() * 10000) + 1;
            String fileName = System.currentTimeMillis() + "_" + randomString + "_" + imageFile.getOriginalFilename();
            String date = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE);

            File file = new File(downloadPath + date + "/");
            file.mkdirs();

            Path path = Paths.get(downloadPath + date + "/" + fileName);
            imageFile.transferTo(path);

            return date + "/" + fileName;
        } catch (IOException e) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_RENDER_ERROR);
        }
    }

    private void checkFileType(String contentType) {
        // TODO : check null
        // the content type, or null if not defined (or no file has been chosen in the multipart form)
        if (contentType == null) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_NOT_FOUND);
        }

        log.info("fileContentType : {}", contentType);
        String fileContentType = contentType.substring(0, contentType.indexOf("/"));

        if (!fileContentType.equals("image")) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_FILE_TYPE_ERROR);
        }
    }

    Page<Menu> selectAll(Pageable pageable) {
        return menuRepository.findAllByDeletedFalse(pageable);
    }

    Page<Menu> selectByName(Pageable pageable, String name) {
        return menuRepository.findByNameContainingAndDeletedFalse(pageable, name);
    }

    @Transactional
    void deleteByMenuId(Long id) {
        jwtComponent.checkAdmin();

        Menu menu = menuRepository.findById(id).orElseThrow(() -> new HandleRuntimeException(GlobalExceptionType.MENU_NOT_FOUND));
        String path = menu.getImagePath();

        menu.delete();
        menuRepository.save(menu);
        deleteMenuImage(path);
    }

    private void deleteMenuImage(String path) {
        File file = new File(downloadPath + path);

        // TODO : delete() 확인 필요
        if (file.exists()) {
            file.delete();
        }
    }

}
