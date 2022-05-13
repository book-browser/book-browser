package com.tabroadn.bookbrowser.dto;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class SeriesDto {
	private Long id;

	private String title;

	private String description;

	private Optional<String> banner;

	private Optional<String> thumbnail;

	private boolean hasThumbnail;

	private boolean hasBanner;

	private List<String> genres = new ArrayList<>();

	@Valid
	private List<LinkDto> links = new ArrayList<>();

	@Valid
	private List<PersonCreatorDto> creators = new ArrayList<>();

	private List<BookDto> books = new ArrayList<>();

	private List<EpisodeDto> episodes = new ArrayList<>();
	
	@JsonIgnore
	public byte[] getBannerBytes() {
		if (!(banner == null || banner.isEmpty())) {
			return Base64.getDecoder().decode(banner.get());
		}
		return null;
	}

	@JsonIgnore
	public byte[] getThumbnailBytes() {
		if (!(thumbnail == null || thumbnail.isEmpty())) {
			return Base64.getDecoder().decode(thumbnail.get());
		}
		return null;
	}
}
