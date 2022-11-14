package com.tabroadn.bookbrowser.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.tabroadn.bookbrowser.entity.Genre;

import lombok.Data;
import lombok.ToString;

@Data
public class SeriesFormDto {
  private Long id;

  private Optional<String> title = Optional.empty();

  private Optional<String> description = Optional.empty();

  private Optional<String> banner = Optional.empty();

  private Optional<String> thumbnail = Optional.empty();

  private List<Genre> genres = new ArrayList<>();

  @Valid
  private List<LinkDto> links = new ArrayList<>();

  @Valid
  private List<CreatorDto> creators = new ArrayList<>();

  @Valid
  private List<PublisherFormDto> publishers = new ArrayList<>();

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

  @ToString.Include(name = "banner")
  private String maskedBanner() {
    if (banner == null) {
      return null;
    } else if (banner.isEmpty()) {
      return banner.toString();
    } else {
      return "*****";
    }
  }
}
