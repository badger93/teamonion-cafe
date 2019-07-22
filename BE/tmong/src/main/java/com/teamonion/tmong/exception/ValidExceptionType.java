package com.teamonion.tmong.exception;

public enum ValidExceptionType {
    MEMBER_NOT_FOUND("memberId", "존재하지 않는 아이디입니다"),
    MEMBERID_OVERLAP("memberId", "이미 사용중인 아이디입니다"),
    PASSWORD_MISMATCH("password", "비밀번호가 일치하지 않습니다"),
    MENU_NOT_FOUND("menuId", "존재하지 않는 메뉴입니다");

    private String field;
    private String errorMessage;

    private ValidExceptionType(String field, String errorMessage) {
        this.field = field;
        this.errorMessage = errorMessage;
    }

    public String getField() {
        return field;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
