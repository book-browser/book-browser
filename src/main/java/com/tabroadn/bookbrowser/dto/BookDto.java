package com.tabroadn.bookbrowser.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;

@Data
@JsonInclude(Include.NON_NULL)
public class BookDto {
  private Long id;

  @Size(max = 50)
  private String title;

  @Size(max = 2000)
  private String description;

  private String thumbnail;

  private String thumbnailUrl;

  private Optional<LocalDate> releaseDate;

  private Long seriesId;

  private String seriesTitle;

  @Valid
  private List<CreatorDto> creators;

  @Valid
  private List<GenreDto> genres;

  @Valid
  private List<LinkDto> links;

  @ToString.Include(name = "thumbnail")
  private String maskedThumbnail() {
    return thumbnail == null ? null : "*****";
  }
}
