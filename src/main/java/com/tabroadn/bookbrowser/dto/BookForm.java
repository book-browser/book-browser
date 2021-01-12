package com.tabroadn.bookbrowser.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class BookForm {
	private Long id;
	
	private String title;
	
	private String description;
		
	private List<PersonCreatorDto> creators;
	
	private MultipartFile thumbnail;
}
