package com.teamonion.tmong.exception;

import lombok.Getter;

@Getter
public class ValidCustomException extends RuntimeException {
    private String field;
    private String errorMessage;

    public ValidCustomException(ValidExceptionType validExceptionType) {
        this.field = validExceptionType.getField();
        this.errorMessage = validExceptionType.getErrorMessage();
    }
}
