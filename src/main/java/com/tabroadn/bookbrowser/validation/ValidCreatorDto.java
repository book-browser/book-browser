package com.tabroadn.bookbrowser.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { CreatorDtoValidator.class })
public @interface ValidCreatorDto {
    String message() default "Invalid creator";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}