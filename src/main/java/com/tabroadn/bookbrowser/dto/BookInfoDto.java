package com.tabroadn.bookbrowser.dto;

import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class BookInfoDto {
	private Long id;
	
	private String title;
	
	private String description;
		
	private Integer pageViews;
	
	private Date uploadDate;
	
	private List<PersonDto> authors;
}
