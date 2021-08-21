package com.tabroadn.bookbrowser.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookDto {
	private Long id;
	
	private String title;
	
	private String description;
		
	private List<PersonCreatorDto> creators;
	
	private List<ReleaseDto> issues;
	
	private List<ReleaseDto> volumes;
	
	private List<GenreDto> genres;
	
	private List<BookLinkDto> links;
}
