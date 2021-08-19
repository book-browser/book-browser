package com.tabroadn.bookbrowser.dto;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import com.tabroadn.bookbrowser.validation.ValidImage;

import lombok.Data;

@Data
public class BookForm {
	private Long id;
	
	private String title;
	
	private String description;
		
	private List<PersonCreatorDto> creators = new ArrayList<>();
	
	private List<GenreDto> genres = new ArrayList<>();
	
	@NotNull
	@ValidImage
	private MultipartFile thumbnail;
}
