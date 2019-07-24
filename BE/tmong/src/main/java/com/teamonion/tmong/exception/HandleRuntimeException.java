package com.teamonion.tmong.exception;

import lombok.Getter;

@Getter
public class HandleRuntimeException extends RuntimeException {
    private String errorMessage;

    public HandleRuntimeException(GlobalExceptionType GlobalExceptionType) {
        this.errorMessage = GlobalExceptionType.getErrorMessage();
    }
}
