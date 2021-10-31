package com.tabroadn.bookbrowser.dto;

import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class BookLinkDto {
	@Size(max = 100)
	private String description;
	@Size(max = 50)
	private String url;
}
