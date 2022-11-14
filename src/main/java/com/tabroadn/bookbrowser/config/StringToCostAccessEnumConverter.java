package com.tabroadn.bookbrowser.config;

import org.springframework.core.convert.converter.Converter;

import com.tabroadn.bookbrowser.domain.CostAccessEnum;

public class StringToCostAccessEnumConverter implements Converter<String, CostAccessEnum> {
  @Override
  public CostAccessEnum convert(String source) {
    return CostAccessEnum.valueOf(source.toUpperCase());
  }
}
