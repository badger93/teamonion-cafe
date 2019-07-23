package com.teamonion.tmong.exception;

import com.teamonion.tmong.validate.ValidationExceptionControllerAdvice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(ValidationExceptionControllerAdvice.class);

    @ExceptionHandler(HandleRuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public GlobalExceptionResponse handleCustomException(HandleRuntimeException e) {
        log.debug("GlobalExceptionResponse : {}", e.getErrorMessage());
        return new GlobalExceptionResponse(e.getErrorMessage());
    }

}
