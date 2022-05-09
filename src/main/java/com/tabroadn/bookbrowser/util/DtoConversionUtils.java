package com.tabroadn.bookbrowser.util;

import java.util.Optional;
import java.util.stream.Collectors;

import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.dto.GenreDto;
import com.tabroadn.bookbrowser.dto.LetterDto;
import com.tabroadn.bookbrowser.dto.LinkDto;
import com.tabroadn.bookbrowser.dto.PersonCreatorDto;
import com.tabroadn.bookbrowser.dto.SeriesDto;
import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.entity.BookLink;
import com.tabroadn.bookbrowser.entity.Creator;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.entity.Series;
import com.tabroadn.bookbrowser.entity.SeriesCreator;
import com.tabroadn.bookbrowser.entity.SeriesLink;

public class DtoConversionUtils {
	public static GenreDto convertGenreToGenreDto(Genre genre) {
		GenreDto genreDto = new GenreDto();
		genreDto.setId(genre.getId());
		genreDto.setName(genre.getName());
		return genreDto;
	}
	
	public static LinkDto convertBookLinkToBookLinkDto(BookLink bookLink) {
		LinkDto bookLinkDto = new LinkDto();
		bookLinkDto.setDescription(bookLink.getDescription());
		bookLinkDto.setUrl(bookLink.getId().getUrl());
		return bookLinkDto;
	}

	public static LinkDto convertBookLinkToBookLinkDto(SeriesLink seriesLink) {
		LinkDto seriesLinkDto = new LinkDto();
		seriesLinkDto.setDescription(seriesLink.getDescription());
		seriesLinkDto.setUrl(seriesLink.getId().getUrl());
		return seriesLinkDto;
	}
	
	public static LetterDto convertLetterEnumToLetterDto(LetterEnum letterEnum) {
		LetterDto letterDto = new LetterDto();
		letterDto.setLabel(letterEnum.getLabel());
		letterDto.setValue(letterEnum.name());
		return letterDto;
	}
	
	public static SeriesDto convertSeriesToSeriesDto(Series series) {
		SeriesDto seriesDto = new SeriesDto();
		seriesDto.setId(series.getId());
		seriesDto.setTitle(series.getTitle());
		seriesDto.setDescription(series.getDescription());
		seriesDto.setHasBanner(series.getBanner() != null);
		seriesDto.setHasThumbnail(series.getThumbnail() != null);
		seriesDto.setBooks(series.getBooks().stream()
				.map(DtoConversionUtils::convertBookToBookDto)
				.collect(Collectors.toList()));
		seriesDto.setCreators(series.getCreators().stream()
				.map(DtoConversionUtils::convertSeriesCreatorToPersonCreatorDto)
				.collect(Collectors.toList()));
		seriesDto.setGenres(series.getGenres().stream().map(Genre::getName)
				.collect(Collectors.toList()));
		seriesDto.setLinks(series.getLinks().stream()
				.map(DtoConversionUtils::convertBookLinkToBookLinkDto)
				.collect(Collectors.toList()));
		return seriesDto;
	}

	public static BookDto convertBookToBookDto(Book book) {
		BookDto bookDto = new BookDto();
		bookDto.setId(book.getId());
		Series series = book.getSeries();
		if (series != null) {
			bookDto.setSeriesId(series.getId());
			bookDto.setSeriesTitle(series.getTitle());
		}
		bookDto.setTitle(book.getTitle());
		bookDto.setDescription(book.getDescription());
		bookDto.setReleaseDate(Optional.ofNullable(book.getReleaseDate()));
		bookDto.setCreators(book.getCreators().stream()
			.map(DtoConversionUtils::convertCreatorToPersonCreatorDto)
			.collect(Collectors.toList()));
		bookDto.setGenres(book.getGenres().stream()
				.map(DtoConversionUtils::convertGenreToGenreDto)
				.collect(Collectors.toList()));
		bookDto.setLinks(book.getLinks().stream()
				.map(DtoConversionUtils::convertBookLinkToBookLinkDto)
				.collect(Collectors.toList()));
		return bookDto;
	}
	
	public static BookSummaryDto convertBookToBookSummaryDto(Book book) {
		BookSummaryDto bookSummary = new BookSummaryDto();
		bookSummary.setId(book.getId());
		bookSummary.setTitle(book.getTitle());
		bookSummary.setDescription(book.getDescription());
		bookSummary.setCreators(book.getCreators().stream()
			.map(DtoConversionUtils::convertCreatorToPersonCreatorDto)
			.collect(Collectors.toList()));
		return bookSummary;
	}
	
	public static PersonCreatorDto convertCreatorToPersonCreatorDto(Creator creator) {
		PersonCreatorDto personCreatorDto = new PersonCreatorDto();
		personCreatorDto.setId(creator.getPerson().getId());
		personCreatorDto.setFullName(creator.getPerson().getFullName());
		personCreatorDto.setRole(creator.getRole());
		return personCreatorDto;
	}

	public static PersonCreatorDto convertSeriesCreatorToPersonCreatorDto(SeriesCreator creator) {
		PersonCreatorDto personCreatorDto = new PersonCreatorDto();
		personCreatorDto.setId(creator.getPerson().getId());
		personCreatorDto.setFullName(creator.getPerson().getFullName());
		personCreatorDto.setRole(creator.getRole());
		return personCreatorDto;
	}
}
