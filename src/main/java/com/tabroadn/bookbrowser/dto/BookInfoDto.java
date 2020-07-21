package com.tabroadn.bookbrowser.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class BookInfoDto {
	private Long id;
	
	private String title;
	
	private String description;
		
	private Integer pageViews;
	
	private LocalDate publishDate;
	
	private List<PersonDto> authors;
}
