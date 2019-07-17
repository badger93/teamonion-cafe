package com.teamonion.tmong.exception;

public class PasswordCheckNotValidException extends Exception {
    public PasswordCheckNotValidException() {
        super();
    }

    public PasswordCheckNotValidException(String message) {
        super(message);
    }
}
