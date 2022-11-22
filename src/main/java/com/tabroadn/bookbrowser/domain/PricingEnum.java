package com.tabroadn.bookbrowser.domain;

import lombok.Getter;

public enum PricingEnum implements DatabaseEnum {
  FREE(1L), FREMIUM(2L), PREMIUM(3L), SUBSCRIPTION(4L);

  @Getter
  private Long id;

  private PricingEnum(Long id) {
    this.id = id;
  }

  public static PricingEnum valueOfId(Long id) {
    for (PricingEnum e : values()) {
      if (e.getId().equals(id)) {
        return e;
      }
    }
    return null;
  }
}
