package com.tabroadn.bookbrowser.dto;

import com.tabroadn.bookbrowser.domain.CreatorTypeEnum;

import lombok.Data;

@Data
public class PersonCreatorDto {
	private Long id;
	
	private String firstName;
	
	private String middleName;
	
	private String lastName;
	
	private CreatorTypeEnum creatorType;
}
