package com.tabroadn.bookbrowser.dto;

import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class BookDto {
	private Long id;

	@Size(max = 50)
	private String title;

	@Size(max = 2000)
	private String description;

	private String thumbnail;

	private Optional<LocalDate> releaseDate;

	private Long seriesId;

	private String seriesTitle;

	@Valid
	private List<CreatorDto> creators;

	@Valid
	private List<GenreDto> genres;

	@Valid
	private List<LinkDto> links;

	@JsonIgnore
	public byte[] getThumbnailBytes() {
		return Base64.getDecoder().decode(thumbnail);
	}
}
