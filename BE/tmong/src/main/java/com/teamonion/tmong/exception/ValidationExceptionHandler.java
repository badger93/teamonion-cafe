package com.teamonion.tmong.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(ValidationExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorsResponse handleValidationException(MethodArgumentNotValidException e) {
        return getValidationErrorResponses(e.getBindingResult());
    }

    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationErrorsResponse handleValidationException(BindException e) {
        return getValidationErrorResponses(e.getBindingResult());
    }

    private ValidationErrorsResponse getValidationErrorResponses(BindingResult e) {
        ValidationErrorsResponse response = new ValidationErrorsResponse();

        for (ObjectError objectError : e.getAllErrors()) {
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

}
