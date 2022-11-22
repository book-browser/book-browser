package com.tabroadn.bookbrowser.util;

import javax.persistence.AttributeConverter;

import com.tabroadn.bookbrowser.domain.DatabaseEnum;

public class DatabaseEnumAttributeConverter implements
    AttributeConverter<DatabaseEnum, Long> {

  @Override
  public Long convertToDatabaseColumn(DatabaseEnum attribute) {
    if (attribute == null) {
      return null;
    }
    return attribute.getId();
  }

  @Override
  public DatabaseEnum convertToEntityAttribute(Long dbData) {
    for (DatabaseEnum databaseEnum : DatabaseEnum.values()) {
      if (databaseEnum.getId().equals(dbData)) {
        return databaseEnum;
      }
    }
    return null;
  }
}
