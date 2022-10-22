package com.tabroadn.bookbrowser.dto;

import lombok.Data;
import lombok.ToString;

@Data
public class UserDto {
  private String username;
  private String password;
  private String email;
  private boolean verified;

  @ToString.Include(name = "password")
  private String maskedPassword() {
    return password == null ? null : "*****";
  }
}
