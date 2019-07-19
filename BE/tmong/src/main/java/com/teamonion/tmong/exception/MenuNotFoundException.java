package com.teamonion.tmong.exception;

public class MenuNotFoundException extends RuntimeException {
    public MenuNotFoundException(Long menu_id) {
        super(menu_id + "는 존재하지 않는 메뉴 ID 입니다.");
    }
}
