package com.tabroadn.bookbrowser.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import lombok.Data;
import lombok.ToString;

@Data
public class EpisodeDto {
  private Long id;

  private String thumbnailUrl;

  private Optional<Long> seriesId;

  private Optional<String> seriesTitle;

  private Optional<String> title;

  private Optional<String> description;

  private Optional<String> thumbnail;

  private Optional<LocalDate> releaseDate;

  private Optional<List<LinkDto>> links;

  @JsonIgnore
  public byte[] getThumbnailBytes() {
    if (!(thumbnail == null || thumbnail.isEmpty())) {
      return Base64.getDecoder().decode(thumbnail.get());
    }
    return null;
  }

  @ToString.Include(name = "thumbnail")
  private String maskedThumbnail() {
    if (thumbnail == null) {
      return null;
    } else if (thumbnail.isEmpty()) {
      return thumbnail.toString();
    } else {
      return "*****";
    }
  }
}
