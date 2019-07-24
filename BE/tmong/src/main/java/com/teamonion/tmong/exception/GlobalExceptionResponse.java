package com.teamonion.tmong.exception;

import lombok.Getter;

@Getter
public class GlobalExceptionResponse {
    private String errorMessage;

    public GlobalExceptionResponse(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
