package com.tabroadn.bookbrowser.dto;

import lombok.Data;
import lombok.ToString;

@Data
public class LoginForm {
  private String username;
  private String password;
  private boolean rememberMe;

  @ToString.Include(name = "password")
  private String maskedPassword() {
    return password == null ? null : "*****";
  }
}
