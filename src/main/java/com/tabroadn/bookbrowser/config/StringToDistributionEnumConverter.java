package com.tabroadn.bookbrowser.config;

import org.springframework.core.convert.converter.Converter;

import com.tabroadn.bookbrowser.domain.DistributionEnum;

public class StringToDistributionEnumConverter implements Converter<String, DistributionEnum> {

  @Override
  public DistributionEnum convert(String source) {
    return DistributionEnum.valueOf(source.toUpperCase());
  }

}
