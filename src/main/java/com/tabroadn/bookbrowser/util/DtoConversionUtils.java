package com.tabroadn.bookbrowser.util;

import com.tabroadn.bookbrowser.dto.GenreDto;
import com.tabroadn.bookbrowser.entity.Genre;

public class DtoConversionUtils {
	public static GenreDto convertGenreToGenreDto(Genre genre) {
		GenreDto genreDto = new GenreDto();
		genreDto.setId(genre.getId());
		genreDto.setName(genre.getName());
		return genreDto;
	}
	
	public static Genre convertGenreDtoToGenre(GenreDto genreDto) {
		Genre genre = new Genre();
		genre.setId(genreDto.getId());
		genre.setName(genreDto.getName());
		return genre;
	}
}
