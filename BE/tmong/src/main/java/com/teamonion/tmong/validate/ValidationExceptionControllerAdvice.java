package com.teamonion.tmong.validate;

import com.teamonion.tmong.exception.ValidCustomException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationExceptionControllerAdvice {
    private static final Logger log = LoggerFactory.getLogger(ValidationExceptionControllerAdvice.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorsResponse handleValidationException(MethodArgumentNotValidException e) {
        ValidationErrorsResponse response = new ValidationErrorsResponse();

        for (ObjectError objectError : e.getBindingResult().getAllErrors()) {
            FieldError fieldError = (FieldError) objectError;
            log.debug("Validation Error : {}", fieldError.getDefaultMessage());
            response.addValidationError(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return response;
    }

    @ExceptionHandler(ValidCustomException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationError handleValidCustomException(ValidCustomException e) {
        log.debug("ValidCustomException : {}, {}", e.getField(), e.getErrorMessage());
        return new ValidationError(e.getField(), e.getErrorMessage());
    }

    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorsResponse menuValidationException(MethodArgumentNotValidException e) {
        ValidationErrorsResponse response = new ValidationErrorsResponse();

        for (ObjectError objectError : e.getBindingResult().getAllErrors()) {
            FieldError fieldError = (FieldError) objectError;
            log.debug("Validation Error : {}", fieldError.getDefaultMessage());
            response.addValidationError(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return response;
    }
}
