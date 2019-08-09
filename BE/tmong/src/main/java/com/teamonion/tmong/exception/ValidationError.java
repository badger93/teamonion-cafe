package com.teamonion.tmong.exception;

import lombok.Getter;

@Getter
public class ValidationError {
    private String field;
    private String errorMessage;

    public ValidationError(String field, String errorMessage) {
        this.field = field;
        this.errorMessage = errorMessage;
    }
}
