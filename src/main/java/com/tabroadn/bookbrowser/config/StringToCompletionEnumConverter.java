package com.tabroadn.bookbrowser.config;

import org.springframework.core.convert.converter.Converter;

import com.tabroadn.bookbrowser.domain.CompletionEnum;

public class StringToCompletionEnumConverter implements Converter<String, CompletionEnum> {

  @Override
  public CompletionEnum convert(String source) {
    return CompletionEnum.valueOf(source.toUpperCase());
  }
}
