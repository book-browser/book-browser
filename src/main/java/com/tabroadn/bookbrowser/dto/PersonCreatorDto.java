package com.tabroadn.bookbrowser.dto;

import com.tabroadn.bookbrowser.domain.RoleEnum;

import lombok.Data;

@Data
public class PersonCreatorDto {
	private Long id;
	
	private String fullName;

	private RoleEnum role;
}
