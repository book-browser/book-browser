package com.tabroadn.bookbrowser.dto;

import java.util.Optional;

import com.tabroadn.bookbrowser.domain.StatusEnum;
import com.tabroadn.bookbrowser.domain.PricingEnum;
import com.tabroadn.bookbrowser.domain.DistributionEnum;

import lombok.Data;

@Data
public class PublisherFormDto {
  private Long partyId;

  private Optional<String> fullName = Optional.empty();

  private Optional<String> url = Optional.empty();

  private Optional<Long> episodeCount = Optional.empty();

  private Optional<PricingEnum> pricing = Optional.empty();

  private Optional<Long> cost = Optional.empty();

  private Optional<StatusEnum> status = Optional.empty();

  private Optional<DistributionEnum> distribution = Optional.empty();

  private Optional<Boolean> preview = Optional.empty();
}
