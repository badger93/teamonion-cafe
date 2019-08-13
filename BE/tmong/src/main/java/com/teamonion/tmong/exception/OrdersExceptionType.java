package com.teamonion.tmong.exception;

import org.springframework.http.HttpStatus;

public enum OrdersExceptionType implements GlobalExceptionType {
    ORDER_MEMBER_NOT_FOUND("주문자 정보가 올바르지 않습니다", HttpStatus.BAD_REQUEST),
    ORDER_POINT_LACK("보유한 포인트가 부족합니다", HttpStatus.PAYMENT_REQUIRED),
    ORDER_NOT_FOUND("주문이 존재하지 않습니다", HttpStatus.BAD_REQUEST),
    ORDER_MENU_NOT_FOUND("주문 메뉴 정보가 존재하지 않습니다", HttpStatus.BAD_REQUEST);

    private String errorMessage;
    private HttpStatus httpStatus;

    OrdersExceptionType(String errorMessage, HttpStatus httpStatus) {
        this.errorMessage = errorMessage;
        this.httpStatus = httpStatus;
    }

    @Override
    public String getErrorMessage() {
        return errorMessage;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
