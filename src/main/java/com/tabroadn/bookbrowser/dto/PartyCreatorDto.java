package com.tabroadn.bookbrowser.dto;

import javax.validation.constraints.Size;

import com.tabroadn.bookbrowser.domain.RoleEnum;

import lombok.Data;

@Data
public class PartyCreatorDto {
	private Long id;

	@Size(max = 150)
	private String fullName;

	private RoleEnum role;
}
