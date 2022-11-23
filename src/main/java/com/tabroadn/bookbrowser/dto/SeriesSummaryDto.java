package com.tabroadn.bookbrowser.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.tabroadn.bookbrowser.domain.GenreEnum;
import com.tabroadn.bookbrowser.domain.StatusEnum;

import lombok.Data;

@Data
public class SeriesSummaryDto {
  private Long id;

  private String title;

  private String description;

  private String urlTitle;

  private LocalDate lastUpdated;

  private String bannerUrl;

  private String thumbnailUrl;

  private StatusEnum status;

  private List<GenreEnum> genres = new ArrayList<>();

  private List<LinkDto> links = new ArrayList<>();

  @Valid
  private List<CreatorDto> creators = new ArrayList<>();

  @Valid
  private List<PublisherDto> publishers = new ArrayList<>();
}
