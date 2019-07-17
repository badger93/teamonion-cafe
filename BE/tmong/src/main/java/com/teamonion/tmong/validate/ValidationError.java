package com.teamonion.tmong.validate;

import lombok.Getter;

@Getter
public class ValidationError {
    private String fieldName;
    private String errorMessage;

    public ValidationError(String fieldName, String errorMessage) {
        this.fieldName = fieldName;
        this.errorMessage = errorMessage;
    }
}
