package com.tabroadn.bookbrowser.domain;

public interface DatabaseEnum {
  public Long getId();

  public static <E extends DatabaseEnum> E[] values() {
    return null;
  };
}
