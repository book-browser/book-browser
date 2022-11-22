package com.tabroadn.bookbrowser.domain;

import lombok.Getter;

public enum StatusEnum implements DatabaseEnum {
  ONGOING(1L), COMPLETED(2L);

  @Getter
  private Long id;

  private StatusEnum(Long id) {
    this.id = id;
  }

  public static StatusEnum valueOfId(Long id) {
    for (StatusEnum e : values()) {
      if (e.getId().equals(id)) {
        return e;
      }
    }
    return null;
  }
}
