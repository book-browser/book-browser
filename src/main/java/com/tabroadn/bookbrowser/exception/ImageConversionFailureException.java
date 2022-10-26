package com.tabroadn.bookbrowser.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ImageConversionFailureException extends RuntimeException {

  public ImageConversionFailureException(String message, Throwable cause) {
    super(message, cause);
  }
}
