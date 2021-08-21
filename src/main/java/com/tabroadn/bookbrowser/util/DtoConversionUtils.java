package com.tabroadn.bookbrowser.util;

import com.tabroadn.bookbrowser.dto.BookLinkDto;
import com.tabroadn.bookbrowser.dto.GenreDto;
import com.tabroadn.bookbrowser.entity.BookLink;
import com.tabroadn.bookbrowser.entity.Genre;

public class DtoConversionUtils {
	public static GenreDto convertGenreToGenreDto(Genre genre) {
		GenreDto genreDto = new GenreDto();
		genreDto.setId(genre.getId());
		genreDto.setName(genre.getName());
		return genreDto;
	}
	
	public static BookLinkDto convertBookLinkToBookLinkDto(BookLink bookLink) {
		BookLinkDto bookLinkDto = new BookLinkDto();
		bookLinkDto.setDescription(bookLink.getDescription());
		bookLinkDto.setId(bookLink.getId());
		bookLinkDto.setUrl(bookLink.getUrl());
		return bookLinkDto;
	}
	
	public static BookLink convertBookLinkDtoToBookLink(BookLinkDto bookLinkDto) {
		BookLink bookLink = new BookLink();
		bookLink.setDescription(bookLinkDto.getDescription());
		bookLink.setId(bookLinkDto.getId());
		bookLink.setUrl(bookLinkDto.getUrl());
		return bookLink;
	}
}
