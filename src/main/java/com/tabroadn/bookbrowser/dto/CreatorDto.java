package com.tabroadn.bookbrowser.dto;

import com.tabroadn.bookbrowser.domain.RoleEnum;

import lombok.Data;

@Data
public class CreatorDto {
	private Long partyId;

	private String fullName;

	private RoleEnum role;
}
