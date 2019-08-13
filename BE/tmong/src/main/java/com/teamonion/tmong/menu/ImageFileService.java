package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.GlobalException;
import com.teamonion.tmong.exception.MenuExceptionType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class ImageFileService {
    private static final Logger log = LoggerFactory.getLogger(MenuService.class);

    @Value("${download-path}")
    private String downloadPath;

    private static final String UNDERSCORE = "_";

    public String imageSaveProcess(MultipartFile imageFile) {
        if (imageFile.isEmpty()) {
            throw new GlobalException(MenuExceptionType.MENU_IMAGE_NOT_FOUND);
        }

        validImageFile(imageFile.getContentType());

        return setMenuImagePath(imageFile);
    }

    private void validImageFile(String contentType) {
        // the content type, or null if not defined (or no file has been chosen in the multipart form)
        if (contentType == null) {
            throw new GlobalException(MenuExceptionType.MENU_IMAGE_NOT_FOUND);
        }

        if (!contentType.contains("image")) {
            throw new GlobalException(MenuExceptionType.MENU_IMAGE_FILE_TYPE_ERROR);
        }

    }

    private String setMenuImagePath(MultipartFile imageFile) {
        try {
            // 저장 이미지 새로운 이름 생성
            String fileName = UUID.randomUUID().toString() + UNDERSCORE + imageFile.getOriginalFilename();

            // 디렉토리 생성
            LocalDate today = LocalDate.now();
            Path datePath = Paths.get(String.valueOf(today.getYear()), String.valueOf(today.getMonthValue())
                    , String.valueOf(today.getDayOfMonth()));
            Path filePath = Paths.get(downloadPath, datePath.toString());
            Files.createDirectories(filePath);

            // 이미지 저장
            Path imagePath = Paths.get(downloadPath, datePath.toString(), fileName);
            imageFile.transferTo(imagePath);

            // 저장된 이미지 디렉토리 반환
            // TODO : "/"를 사용하지 않을 방법
            return datePath.toString() + "/" + fileName;
        } catch (IOException e) {
            throw new GlobalException(MenuExceptionType.MENU_IMAGE_RENDER_ERROR);
        }
    }

    public void deleteImageFile(String imagePath) {
        Path filePath = Paths.get(downloadPath + imagePath);

        try {
            Files.delete(filePath);
        } catch (IOException e) {
            throw new GlobalException(MenuExceptionType.MENU_IMAGE_DELETE_ERROR);
        }
    }

    public String imageUpdateProcess(MultipartFile imageFile, String imagePath) {
        if (imageFile != null) {
            deleteImageFile(imagePath);

            imagePath = imageSaveProcess(imageFile);
        }

        return imagePath;
    }
}
