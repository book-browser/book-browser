package com.tabroadn.bookbrowser.dto;

import java.util.List;
import lombok.Data;

@Data
public class ReferenceData {
  private List<RoleDto> roles;
  private List<GenreDto> genres;
  private List<LetterDto> letters;
}
