package com.teamonion.tmong.exception;

import com.teamonion.tmong.validate.ValidationExceptionControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(ValidationExceptionControllerAdvice.class);

    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<String> handleCustomException(GlobalException e) {
        log.debug("global exception : {} {}", e.getErrorMessage(), e.getHttpStatus());
        return new ResponseEntity<>(e.getErrorMessage(), e.getHttpStatus());
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleOverMaxFileSizeUpload(MaxUploadSizeExceededException e) {
        return new ResponseEntity<>("파일 사이즈가 너무 큽니다(10MB 이하 가능)", HttpStatus.BAD_REQUEST);
    }

}
