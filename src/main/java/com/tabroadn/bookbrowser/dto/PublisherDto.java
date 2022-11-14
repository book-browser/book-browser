package com.tabroadn.bookbrowser.dto;

import com.tabroadn.bookbrowser.domain.CompletionEnum;
import com.tabroadn.bookbrowser.domain.CostAccessEnum;
import com.tabroadn.bookbrowser.domain.DistributionEnum;

import lombok.Data;

@Data
public class PublisherDto {
  private Long partyId;

  private String fullName;

  private String url;

  private Long episodeCount;

  private CostAccessEnum costAccess;

  private Long cost;

  private CompletionEnum completion;

  private DistributionEnum distribution;

  private Boolean preview;
}
