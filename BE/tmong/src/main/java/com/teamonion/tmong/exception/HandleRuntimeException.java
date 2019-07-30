package com.teamonion.tmong.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class HandleRuntimeException extends RuntimeException {
    private String errorMessage;
    private HttpStatus httpStatus;

    public HandleRuntimeException(GlobalExceptionType globalExceptionType) {
        this.errorMessage = globalExceptionType.getErrorMessage();
        this.httpStatus = globalExceptionType.getHttpStatus();
    }
}
