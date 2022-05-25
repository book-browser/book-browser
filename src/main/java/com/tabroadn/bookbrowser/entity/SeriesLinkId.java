package com.tabroadn.bookbrowser.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
@Embeddable
@Valid
public class SeriesLinkId implements Serializable {
  @Column private Long seriesId;

  @Column
  @NotBlank
  @Size(max = 100)
  private String url;
}
