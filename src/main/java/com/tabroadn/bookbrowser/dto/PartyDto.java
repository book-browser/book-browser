package com.tabroadn.bookbrowser.dto;

import java.util.Base64;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.ToString;

@Data
public class PartyDto {
  private Long id;
  private Optional<String> fullName;
  private String urlName;
  private Optional<String> description;
  @ToString.Exclude
  private Optional<String> picture;
  private boolean hasPicture;

  @JsonIgnore
  public byte[] getPictureBytes() {
    if (!(picture == null || picture.isEmpty())) {
      return Base64.getDecoder().decode(picture.get());
    }
    return null;
  }
}
