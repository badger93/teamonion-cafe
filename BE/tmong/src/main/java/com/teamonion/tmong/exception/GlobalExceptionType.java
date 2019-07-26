package com.teamonion.tmong.exception;

import org.springframework.http.HttpStatus;

public enum GlobalExceptionType {
    MENU_NOT_FOUND("해당 메뉴 정보가 존재하지 않습니다", HttpStatus.BAD_REQUEST),
    MENU_IMAGE_NOT_FOUND("이미지 파일이 존재하지 않습니다", HttpStatus.BAD_REQUEST),
    MENU_IMAGE_RENDER_ERROR("이미지를 저장하는데 실패했습니다", HttpStatus.INTERNAL_SERVER_ERROR),
    ORDER_MEMBER_NOT_FOUND("주문자 정보가 올바르지 않습니다", HttpStatus.BAD_REQUEST),
    ORDER_POINT_LACK("보유한 포인트가 부족합니다", HttpStatus.PAYMENT_REQUIRED),
    UNAUTHORIZED("인증에 실패했습니다", HttpStatus.UNAUTHORIZED),
    REQUEST_IS_NULL("요청값이 null 입니다", HttpStatus.BAD_REQUEST),
    ORDER_NOT_FOUND("주문이 존재하지 않습니다", HttpStatus.BAD_REQUEST);

    private String errorMessage;
    private HttpStatus httpStatus;

    GlobalExceptionType(String errorMessage, HttpStatus httpStatus) {
        this.errorMessage = errorMessage;
        this.httpStatus = httpStatus;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
