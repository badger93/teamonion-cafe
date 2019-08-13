package com.teamonion.tmong.exception;

import org.springframework.http.HttpStatus;

public interface GlobalExceptionType {

    String getErrorMessage();

    HttpStatus getHttpStatus();

}
