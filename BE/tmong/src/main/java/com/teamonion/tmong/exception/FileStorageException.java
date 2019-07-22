package com.teamonion.tmong.exception;

import java.io.IOException;

public class FileStorageException extends IOException {
    public FileStorageException(String message) {
        super("메뉴 이미지 저장 실패 : " + message);
    }
}
