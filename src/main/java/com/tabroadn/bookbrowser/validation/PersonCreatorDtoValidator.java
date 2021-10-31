package com.tabroadn.bookbrowser.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.tabroadn.bookbrowser.dto.PersonCreatorDto;

import io.micrometer.core.instrument.util.StringUtils;

public class PersonCreatorDtoValidator implements ConstraintValidator<ValidPersonCreatorDto, PersonCreatorDto> {
    @Override
    public boolean isValid(PersonCreatorDto personCreatorDto, ConstraintValidatorContext context) {
        boolean result = true;
               
        if (personCreatorDto.getId() == null && StringUtils.isBlank(personCreatorDto.getFullName())) {
        	context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("id must not be null or full name must not be blank")
                   .addConstraintViolation();
            
            result = false;
        }

        return result;
    }
}
