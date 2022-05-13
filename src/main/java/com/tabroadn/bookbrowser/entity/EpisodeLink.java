package com.tabroadn.bookbrowser.entity;


import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Valid
public class EpisodeLink {
  @EmbeddedId
	@Valid
	private EpisodeLinkId id = new EpisodeLinkId();
	
	@NotBlank
	@Size(max = 50)
	private String description;
	
	@MapsId("episodeId")
	@ManyToOne
	@JoinColumn
	@ToString.Exclude
	private Episode episode;
}

