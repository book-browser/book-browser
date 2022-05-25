package com.tabroadn.bookbrowser.validation;

import com.tabroadn.bookbrowser.dto.CreatorDto;
import io.micrometer.core.instrument.util.StringUtils;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CreatorDtoValidator implements ConstraintValidator<ValidCreatorDto, CreatorDto> {
  @Override
  public boolean isValid(CreatorDto creatorDto, ConstraintValidatorContext context) {
    boolean result = true;

    if (creatorDto.getPartyId() == null && StringUtils.isBlank(creatorDto.getFullName())) {
      context.disableDefaultConstraintViolation();
      context
          .buildConstraintViolationWithTemplate(
              "id must not be null or full name must not be blank")
          .addConstraintViolation();

      result = false;
    }

    return result;
  }
}
