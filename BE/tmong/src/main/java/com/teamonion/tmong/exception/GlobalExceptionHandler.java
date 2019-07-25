package com.teamonion.tmong.exception;

import com.teamonion.tmong.validate.ValidationExceptionControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(ValidationExceptionControllerAdvice.class);

    @ExceptionHandler(HandleRuntimeException.class)
    public ResponseEntity<String> handleCustomException(HandleRuntimeException e) {
        log.debug("global exception : {}", e.getErrorMessage());
        return new ResponseEntity<>(e.getErrorMessage(), e.getHttpStatus());
    }

}
