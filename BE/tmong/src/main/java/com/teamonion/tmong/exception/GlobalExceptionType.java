package com.teamonion.tmong.exception;

public enum GlobalExceptionType {
    MENU_NOT_FOUND("해당 메뉴 정보가 존재하지 않습니다"),
    MENUIMAGE_NOT_FOUND("이미지 파일이 존재하지 않습니다"),
    MENUIMAGE_RENDER_ERROR("이미지를 저장하는데 실패했습니다"),
    ORDER_MEMBER_NOT_FOUND("주문자 정보가 옳바르지 않습니다"),
    ORDER_POINT_LACK("보유한 포인트가 부족합니다"),
    UNAUTHORIZED("인증에 실패했습니다");

    private String errorMessage;

    GlobalExceptionType(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
