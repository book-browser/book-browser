package com.tabroadn.bookbrowser.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Valid
public class SeriesLink {
  @EmbeddedId @Valid private SeriesLinkId id = new SeriesLinkId();

  @NotBlank
  @Size(max = 50)
  private String description;

  @MapsId("seriesId")
  @ManyToOne
  @JoinColumn
  private Series series;
}
