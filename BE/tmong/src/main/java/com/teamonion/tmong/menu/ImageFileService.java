package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.GlobalExceptionType;
import com.teamonion.tmong.exception.HandleRuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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

        if (!contentType.substring(0, contentType.indexOf("/")).equals("image")) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_FILE_TYPE_ERROR);
        }

    }

    private String setMenuImagePath(MultipartFile imageFile) {
        try {
            int randomString = (int) (Math.random() * 10000) + 1;
            String fileName = System.currentTimeMillis() + "_" + randomString + "_" + imageFile.getOriginalFilename();
            String date = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE) + "/";

            File file = new File(downloadPath + date);
            file.mkdirs();

            Path path = Paths.get(downloadPath + date + fileName);
            imageFile.transferTo(path);

            return date + fileName;
        } catch (IOException e) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_RENDER_ERROR);
        }
    }

    void deleteImageFile(String imagePath) {
        File file = new File(downloadPath + imagePath);

        final boolean checkDeleted = file.delete();
        if (!checkDeleted) {
            throw new HandleRuntimeException(GlobalExceptionType.MENU_IMAGE_DELETE_ERROR);
        }
    }
}
