package com.tabroadn.bookbrowser.dto;

import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class LinkDto {
  @Size(max = 50)
  private String description;

  @Size(max = 100)
  private String url;
}
