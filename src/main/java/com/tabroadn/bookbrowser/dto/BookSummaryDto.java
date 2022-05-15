package com.tabroadn.bookbrowser.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookSummaryDto {
	private Long id;

	private String title;

	private String description;

	private List<PartyCreatorDto> creators;
}
