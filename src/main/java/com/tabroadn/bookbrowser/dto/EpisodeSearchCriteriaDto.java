package com.tabroadn.bookbrowser.dto;

import java.util.Optional;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.validation.ValidEpisodeSort;

import lombok.Data;

@Data
public class EpisodeSearchCriteriaDto {
  @Min(1)
  @NotNull
  private Integer limit = 50;

  @Min(0)
  @NotNull
  private Integer page = 0;

  @ValidEpisodeSort
  private String sort = "id";

  @NotNull
  private OrderEnum order = OrderEnum.DESC;

  private Optional<String> seriesId = Optional.empty();
}