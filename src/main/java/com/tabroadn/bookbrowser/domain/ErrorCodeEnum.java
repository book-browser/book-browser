package com.tabroadn.bookbrowser.domain;

public enum ErrorCodeEnum {
  UNKNOWN("name", 0),
  USERNAME_NOT_FOUND("Username Not Found", 1),
  INCORRECT_PASSWORD("Incorrect Password", 2);

  private String name;
  private int value;

  private ErrorCodeEnum(String name, int value) {
    this.name = name;
    this.value = value;
  }

  public String getName() {
    return name;
  }

  public int getValue() {
    return value;
  }
}
