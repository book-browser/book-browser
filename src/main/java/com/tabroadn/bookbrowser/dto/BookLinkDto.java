package com.tabroadn.bookbrowser.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class BookLinkDto {
	private Long id;
	@NotBlank
	@Size(max = 100)
	private String description;
	@NotBlank
	@Size(max = 50)
	private String url;
}
