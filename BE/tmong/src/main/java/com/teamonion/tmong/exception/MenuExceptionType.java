package com.teamonion.tmong.exception;

import org.springframework.http.HttpStatus;

/**
 * MenuExceptionType 이라는 말이 추상적으로 느껴져요
 * 어느 정도 세분화 해서 구분 지으면 좋을거 같아요
 */
public enum MenuExceptionType implements GlobalExceptionType {
    MENU_NOT_FOUND("해당 메뉴 정보가 존재하지 않습니다", HttpStatus.BAD_REQUEST),
    MENU_IMAGE_NOT_FOUND("이미지 파일이 존재하지 않습니다", HttpStatus.BAD_REQUEST),
    MENU_IMAGE_FILE_TYPE_ERROR("메뉴 이미지 파일 형식이 잘못되었습니다. (jpg, png만 가능)", HttpStatus.BAD_REQUEST),
    MENU_IMAGE_RENDER_ERROR("이미지를 저장하는데 실패했습니다", HttpStatus.INTERNAL_SERVER_ERROR),
    MENU_IMAGE_DELETE_ERROR("메뉴 이미지를 삭제하는데 실패했습니다", HttpStatus.INTERNAL_SERVER_ERROR);

    private String errorMessage;
    private HttpStatus httpStatus;

    MenuExceptionType(String errorMessage, HttpStatus httpStatus) {
        this.errorMessage = errorMessage;
        this.httpStatus = httpStatus;
    }


    @Override
    public String getErrorMessage() { return errorMessage; }

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
