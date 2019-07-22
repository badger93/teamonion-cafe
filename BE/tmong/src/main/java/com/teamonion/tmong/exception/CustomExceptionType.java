package com.teamonion.tmong.exception;

public enum CustomExceptionType {
    MENUIMAGE_NOT_FOUND("이미지 파일이 없습니다"),
    MENUIMAGE_RENDER_ERROR("이미지를 저장하는데 실패했습니다"),
    MENU_ADD_ERROR("메뉴를 추가하는데 실패했습니다");

    private String errorMessage;

    private CustomExceptionType(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
