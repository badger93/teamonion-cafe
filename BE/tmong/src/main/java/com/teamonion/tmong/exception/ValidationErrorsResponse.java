package com.teamonion.tmong.exception;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ValidationErrorsResponse {
    private List<ValidationError> errors;

    public ValidationErrorsResponse() {
        errors = new ArrayList<>();
    }

    public void addValidationError(String field, String errorMessage) {
        errors.add(new ValidationError(field, errorMessage));
    }
}
