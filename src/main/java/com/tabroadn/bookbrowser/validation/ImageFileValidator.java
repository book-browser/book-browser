package com.tabroadn.bookbrowser.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.web.multipart.MultipartFile;

public class ImageFileValidator implements ConstraintValidator<ValidImage, MultipartFile> {

    @Override
    public void initialize(ValidImage constraintAnnotation) {
    }

    @Override
    public boolean isValid(MultipartFile multipartFile, ConstraintValidatorContext context) {
        boolean result = true;
        if (multipartFile != null && !isSupportedContentType(multipartFile.getContentType())) {
        	context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "Only PNG or JPG images are allowed.")
                   .addConstraintViolation();

            result = false;
        }

        return result;
    }

    private boolean isSupportedContentType(String contentType) {
        return contentType.equals("image/png")
                || contentType.equals("image/jpg")
                || contentType.equals("image/jpeg");
    }
}