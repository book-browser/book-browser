package com.tabroadn.bookbrowser.entity;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.validation.constraints.Size;

import com.tabroadn.bookbrowser.domain.CompletionEnum;
import com.tabroadn.bookbrowser.domain.CostAccessEnum;
import com.tabroadn.bookbrowser.domain.DistributionEnum;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class SeriesPublisher implements Serializable {
  private static final long serialVersionUID = 1L;

  @EmbeddedId
  private SeriesPartyId id = new SeriesPartyId();

  @Column
  @Size(max = 100)
  private String url;

  @Column
  private Long episodeCount;

  @Enumerated(EnumType.STRING)
  private CostAccessEnum costAccess;

  @Column
  private Long cost;

  @Enumerated(EnumType.STRING)
  private CompletionEnum completion;

  @Enumerated(EnumType.STRING)
  private DistributionEnum distribution;

  @Column
  private Boolean preview;

  @MapsId("seriesId")
  @ManyToOne
  @JoinColumn(name = "series_id")
  @ToString.Exclude
  private Series series;

  @MapsId("partyId")
  @ManyToOne(cascade = CascadeType.PERSIST)
  @JoinColumn
  private Party party;
}
