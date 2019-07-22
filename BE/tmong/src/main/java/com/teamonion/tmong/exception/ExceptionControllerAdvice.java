package com.teamonion.tmong.exception;

import com.teamonion.tmong.validate.ValidationExceptionControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {
    private static final Logger log = LoggerFactory.getLogger(ValidationExceptionControllerAdvice.class);

    @ExceptionHandler(CustomException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomExceptionError handleCustomException(CustomException e) {
        log.debug("CustomExceptionError : {}", e.getErrorMessage());
        return new CustomExceptionError(e.getErrorMessage());
    }
}
