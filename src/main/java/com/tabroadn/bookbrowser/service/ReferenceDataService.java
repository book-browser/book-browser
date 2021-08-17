package com.tabroadn.bookbrowser.service;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.domain.RoleEnum;
import com.tabroadn.bookbrowser.dto.GenreDto;
import com.tabroadn.bookbrowser.dto.ReferenceData;
import com.tabroadn.bookbrowser.dto.RoleDto;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.repository.GenreRepository;

@Component
public class ReferenceDataService {
	private GenreRepository genreRepository;
	
	@Autowired
	public ReferenceDataService(
			GenreRepository genreRepository) {
		this.genreRepository = genreRepository;
	}
	
	public ReferenceData getReferenceData() {
		ReferenceData referenceData = new ReferenceData();
		referenceData.setRoles(Arrays.asList(RoleEnum.values()).stream()
				.map(ReferenceDataService::convertRoleToRoleDto)
				.collect(Collectors.toList()));
		
		referenceData.setGenres(genreRepository.findAll().stream()
				.map(ReferenceDataService::convertGenreToGenreDto)
				.collect(Collectors.toList()));	
		
		return referenceData;
	}
	
	private static RoleDto convertRoleToRoleDto(RoleEnum role) {
		RoleDto roleDto = new RoleDto();
		roleDto.setTitle(role.getTitle());
		roleDto.setValue(role.ordinal());
		return roleDto;
	}
	
	private static GenreDto convertGenreToGenreDto(Genre genre) {
		GenreDto genreDto = new GenreDto();
		genreDto.setId(genre.getId());
		genreDto.setName(genre.getName());
		return genreDto;
	}
}
