package com.teamonion.tmong.exception;

import lombok.Getter;

@Getter
public class CustomExceptionError {
    private String errorMessage;

    public CustomExceptionError(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
