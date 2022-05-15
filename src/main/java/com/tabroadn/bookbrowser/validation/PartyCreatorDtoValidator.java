package com.tabroadn.bookbrowser.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.tabroadn.bookbrowser.dto.PartyCreatorDto;

import io.micrometer.core.instrument.util.StringUtils;

public class PartyCreatorDtoValidator implements ConstraintValidator<ValidPartyCreatorDto, PartyCreatorDto> {
    @Override
    public boolean isValid(PartyCreatorDto partyCreatorDto, ConstraintValidatorContext context) {
        boolean result = true;

        if (partyCreatorDto.getId() == null && StringUtils.isBlank(partyCreatorDto.getFullName())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("id must not be null or full name must not be blank")
                    .addConstraintViolation();

            result = false;
        }

        return result;
    }
}
