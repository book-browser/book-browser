package com.tabroadn.bookbrowser.dto;

import java.util.Base64;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class SeriesDto {
	private Long id;

	private String title;

	private String description;

	private String banner;

	private List<BookDto> books;
	
	@JsonIgnore
	public byte[] getBannerBytes() {
		return Base64.getDecoder().decode(banner);
	}
}
