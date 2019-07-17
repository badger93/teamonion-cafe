package com.teamonion.tmong.validate;

import com.teamonion.tmong.exception.MemberNotFoundException;
import com.teamonion.tmong.exception.PasswordMismatchException;
import com.teamonion.tmong.exception.ValidCustomException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
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
            log.info("Validation Error : {}", fieldError.getDefaultMessage());
            response.addValidationError(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return response;
    }

    @ExceptionHandler(PasswordMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationError handleValidationException() {
        log.info("PasswordMismatchException!!");
        return new ValidationError("password", "비밀번호가 일치하지 않습니다");
    }

    @ExceptionHandler(MemberNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationError handleMemberNotFoundException() {
        log.info("MemberNotFoundException!!");
        return new ValidationError("memberId", "존재하지 않는 아이디입니다");
    }

    @ExceptionHandler(ValidCustomException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ValidationError handleValidCustomException(ValidCustomException e) {
        log.info("ValidCustomException!!");
        return new ValidationError(e.getField(), e.getErrorMessage());
    }
}
