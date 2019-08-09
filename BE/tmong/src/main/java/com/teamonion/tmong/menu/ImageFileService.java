package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
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
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Service
public class ImageFileService {
    private static final Logger log = LoggerFactory.getLogger(MenuService.class);

    @Value("${download-path}")
    private String downloadPath;

    String imageAddProcess(MultipartFile imageFile) {

        if (imageFile.isEmpty()) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_NOT_FOUND);
        }

        checkFileType(imageFile.getContentType());

        return setMenuImagePath(imageFile);
    }

    private void checkFileType(String contentType) {
        // the content type, or null if not defined (or no file has been chosen in the multipart form)
        if (contentType == null) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_NOT_FOUND);
        }

        if (!contentType.contains("image")) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_FILE_TYPE_ERROR);
        }

    }

    private String setMenuImagePath(MultipartFile imageFile) {
        try {
            // TODO : Study .. new Random()
            // TODO : file directory divide
            int randomString = (int) (Math.random() * 10000) + 1;
            String fileName = System.currentTimeMillis() + "_" + randomString + "_" + imageFile.getOriginalFilename();
            LocalDate today = LocalDate.now();

            Path datePath = Paths.get(String.valueOf(today.getYear()), String.valueOf(today.getMonthValue()), String.valueOf(today.getDayOfMonth()));

            Path filePath = Paths.get(downloadPath, datePath.toString());
            Files.createDirectories(filePath);

            Path imagePath = Paths.get(downloadPath, datePath.toString(), fileName);
            imageFile.transferTo(imagePath);

//            log.info("imagePath .. {}", imagePath.toString());

            // TODO : "/"를 사용하지 않을 방법
            return datePath.toString() + "/" + fileName;
        } catch (IOException e) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_RENDER_ERROR);
        }
    }

    void deleteImageFile(String imagePath) {
        Path filePath = Paths.get(downloadPath + imagePath);

        try {
            Files.delete(filePath);
        } catch (IOException e) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_DELETE_ERROR);
        }
    }
}
