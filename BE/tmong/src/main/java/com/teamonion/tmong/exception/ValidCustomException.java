package com.teamonion.tmong.exception;

import lombok.Getter;

@Getter
public class ValidCustomException extends RuntimeException {
    private String field;
    private String errorMessage;

    public ValidCustomException(String field, String errorMessage) {
        this.field = field;
        this.errorMessage = errorMessage;
    }
}
