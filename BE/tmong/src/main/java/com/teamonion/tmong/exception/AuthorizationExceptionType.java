package com.teamonion.tmong.exception;

import org.springframework.http.HttpStatus;

public enum AuthorizationExceptionType implements GlobalExceptionType {
    UNAUTHORIZED("인증에 실패했습니다", HttpStatus.UNAUTHORIZED),
    REQUEST_IS_NULL("Request가 null 입니다", HttpStatus.BAD_REQUEST);

    private String errorMessage;
    private HttpStatus httpStatus;

    AuthorizationExceptionType(String errorMessage, HttpStatus httpStatus) {
        this.errorMessage = errorMessage;
        this.httpStatus = httpStatus;
    }

    @Override
    public String getErrorMessage() { return errorMessage;}

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
