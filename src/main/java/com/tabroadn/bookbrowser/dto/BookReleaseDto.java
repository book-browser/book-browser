package com.tabroadn.bookbrowser.dto;

import java.time.LocalDate;

import com.tabroadn.bookbrowser.domain.ReleaseTypeEnum;

import lombok.Data;

@Data
public class BookReleaseDto {
	private Long id;
	
	private Long bookId;
	
	private String bookTitle;
		
	private ReleaseTypeEnum releaseType;
	
	private Integer releaseNumber;
	
	private LocalDate publishDate;
}
