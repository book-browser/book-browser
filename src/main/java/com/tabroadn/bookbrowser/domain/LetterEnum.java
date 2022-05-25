package com.tabroadn.bookbrowser.domain;

import lombok.Getter;

public enum LetterEnum {
  ALL("[A-Z0-9]", "All"),
  NUMBER("[0-9]", "0-9"),
  A("A"),
  B("B"),
  C("C"),
  D("D"),
  E("E"),
  F("F"),
  G("G"),
  H("H"),
  I("I"),
  J("J"),
  K("K"),
  L("L"),
  M("M"),
  N("N"),
  O("O"),
  P("P"),
  Q("Q"),
  R("R"),
  S("S"),
  T("T"),
  U("U"),
  V("V"),
  W("W"),
  X("X"),
  Y("Y"),
  Z("Z");

  @Getter private String group;

  @Getter private String label;

  private LetterEnum(String group) {
    this.group = group;
    this.label = group;
  }

  private LetterEnum(String group, String label) {
    this.group = group;
    this.label = label;
  }
}
