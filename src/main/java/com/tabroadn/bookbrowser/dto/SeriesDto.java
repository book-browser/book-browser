package com.tabroadn.bookbrowser.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.tabroadn.bookbrowser.domain.GenreEnum;
import com.tabroadn.bookbrowser.domain.StatusEnum;

import lombok.Data;
import lombok.ToString;

@Data
@JsonInclude(Include.NON_NULL)
public class SeriesDto {
  private Long id;

  private String title;

  private String description;

  private String bannerUrl;

  private String urlTitle;

  private String thumbnailUrl;

  private Optional<String> banner;

  private Optional<String> thumbnail;

  private LocalDate lastUpdated;

  private StatusEnum status;

  private List<GenreEnum> genres = new ArrayList<>();

  @Valid
  private List<LinkDto> links = new ArrayList<>();

  @Valid
  private List<CreatorDto> creators = new ArrayList<>();

  @Valid
  private List<PublisherDto> publishers = new ArrayList<>();

  private List<BookDto> books = new ArrayList<>();

  private List<EpisodeDto> episodes = new ArrayList<>();

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
