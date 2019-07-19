package com.teamonion.tmong.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException() {
        super("인증에 실패했습니다");
    }
}
