package com.tabroadn.bookbrowser.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import lombok.Data;

@Data
public class SeriesSummaryDto {
  private Long id;

  private String title;

  private String description;

  private LocalDate lastUpdated;

  private String bannerUrl;

  private String thumbnailUrl;

  private List<String> genres = new ArrayList<>();

  private List<LinkDto> links = new ArrayList<>();

  @Valid
  private List<CreatorDto> creators = new ArrayList<>();

  @Valid
  private List<PublisherDto> publishers = new ArrayList<>();
}
