package com.tabroadn.bookbrowser.domain;

import lombok.Getter;

public enum DistributionEnum implements DatabaseEnum {
  DIGITAL(1L), PRINT(2L);

  @Getter
  private Long id;

  private DistributionEnum(Long id) {
    this.id = id;
  }

  public static DistributionEnum valueOfId(Long id) {
    for (DistributionEnum e : values()) {
      if (e.getId().equals(id)) {
        return e;
      }
    }
    return null;
  }
}
