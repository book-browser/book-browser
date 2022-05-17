package com.tabroadn.bookbrowser.validation;

import java.util.Arrays;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PartySortValidator implements ConstraintValidator<ValidPartySort, String> {
    private static final List<String> VALID_SORT_FIELDS = Arrays.asList("id", "title");

    @Override
    public boolean isValid(String sort, ConstraintValidatorContext context) {
        boolean result = true;

        if (!VALID_SORT_FIELDS.contains(sort)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(String.format("%s is a not a valid sort parameter", sort))
                    .addConstraintViolation();

            result = false;
        }

        return result;
    }
}
