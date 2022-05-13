package com.tabroadn.bookbrowser.dto;

import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.ToString;

@Data
public class EpisodeDto {
  private Long id;

  private Optional<Long> seriesId;

	private Optional<String> seriesTitle;

  private Optional<String> title;

  private Optional<String> description;

  @ToString.Exclude
	private Optional<String> thumbnail;

  private Optional<LocalDate> releaseDate;

	private Optional<List<LinkDto>> links;

  @JsonIgnore
	public byte[] getThumbnailBytes() {
		if (!(thumbnail == null || thumbnail.isEmpty())) {
			return Base64.getDecoder().decode(thumbnail.get());
		}
		return null;
	}
}
