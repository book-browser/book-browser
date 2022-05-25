package com.tabroadn.bookbrowser.domain;

import lombok.Getter;

@Getter
public enum RoleEnum {
  AUTHOR("Author"),
  ILLUSTRATOR("Illustrator"),
  COLORIST("Colorist"),
  TRANSLATOR("Translator");

  private String title;

  private RoleEnum(String title) {
    this.title = title;
  }
}
