package com.tabroadn.bookbrowser.service;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.domain.RoleEnum;
import com.tabroadn.bookbrowser.dto.ReferenceData;
import com.tabroadn.bookbrowser.dto.RoleDto;

@Component
public class ReferenceDataService {
	public ReferenceData getReferenceData() {
		ReferenceData referenceData = new ReferenceData();
		referenceData.setRoles(Arrays.asList(RoleEnum.values()).stream()
				.map(ReferenceDataService::convertRoleToRoleDto)
				.collect(Collectors.toList()));
		return referenceData;
	}
	
	private static RoleDto convertRoleToRoleDto(RoleEnum role) {
		RoleDto roleDto = new RoleDto();
		roleDto.setTitle(role.getTitle());
		roleDto.setValue(role.ordinal());
		return roleDto;
	}
}
