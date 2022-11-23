package com.tabroadn.bookbrowser.dto;

import com.tabroadn.bookbrowser.domain.StatusEnum;
import com.tabroadn.bookbrowser.domain.PricingEnum;
import com.tabroadn.bookbrowser.domain.DistributionEnum;

import lombok.Data;

@Data
public class PublisherDto {
  private Long partyId;

  private String fullName;

  private String urlName;

  private String url;

  private Long episodeCount;

  private PricingEnum pricing;

  private Long cost;

  private StatusEnum status;

  private DistributionEnum distribution;

  private Boolean preview;
}
