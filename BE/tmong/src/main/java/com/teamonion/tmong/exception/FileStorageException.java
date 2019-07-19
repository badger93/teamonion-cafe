package com.teamonion.tmong.exception;

import java.io.IOException;

public class FileStorageException extends IOException {
    public FileStorageException() {
        super("이미지를 저장하는데 실패하였습니다. - 파일없음");
    }
}
