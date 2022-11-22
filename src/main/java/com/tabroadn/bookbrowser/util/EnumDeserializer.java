package com.tabroadn.bookbrowser.util;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import org.apache.commons.lang3.math.NumberUtils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class EnumDeserializer extends JsonDeserializer<Enum> {

  private Class<? extends Enum> enumType;

  public EnumDeserializer(Class<? extends Enum> enumType) {
    this.enumType = enumType;
  }

  @Override
  public Enum deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
    String source = jp.getValueAsString();

    if (source.isBlank()) {
      return null;
    }

    if (NumberUtils.isCreatable(source)) {
      try {
        return (Enum) enumType.getMethod("valueOfId", Long.class).invoke(null, Long.parseLong(source));
      } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException
          | SecurityException e) {
      }
    }

    return Enum.valueOf(enumType, source.toUpperCase().replaceAll("-", "_"));
  }

}