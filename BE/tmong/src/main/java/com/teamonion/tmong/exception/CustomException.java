package com.teamonion.tmong.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
    private String errorMessage;

    public CustomException(CustomExceptionType customExceptionType) {
        this.errorMessage = customExceptionType.getErrorMessage();
    }
}
