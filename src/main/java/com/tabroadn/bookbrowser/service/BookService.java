package com.tabroadn.bookbrowser.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.domain.ReleaseTypeEnum;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.dto.PersonCreatorDto;
import com.tabroadn.bookbrowser.dto.ReleaseDto;
import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.entity.Creator;
import com.tabroadn.bookbrowser.entity.Release;
import com.tabroadn.bookbrowser.repository.BookRepository;

@Component
public class BookService {
	@Autowired
	private BookRepository repository;

	public BookDto findById(Long id) {
		return convertBookToBookDto(repository.findById(id).get());
	}	
	
	public byte[] findBookThumbnail(Long id) {
		return repository.findById(id).get().getThumbnail();
	}
	
	public List<BookSummaryDto> findByTitleContaining(String title) {
		return repository.findByTitleContainingIgnoreCase(title)
						 .stream().map(BookService::convertBookToBookSummaryDto)
						 .collect(Collectors.toList());
	}
	
	private static BookDto convertBookToBookDto(Book book) {
		BookDto bookDto = new BookDto();
		bookDto.setId(book.getId());
		bookDto.setTitle(book.getTitle());
		bookDto.setDescription(book.getDescription());
		bookDto.setCreators(book.getCreators().stream()
			.map(BookService::convertCreatorToPersonCreatorDto)
			.collect(Collectors.toList()));
		bookDto.setIssues(book.getReleases().stream()
			.map(BookService::convertReleaseToReleaseDto)
			.filter((release) -> release.getReleaseType() == ReleaseTypeEnum.ISSUE)
			.collect(Collectors.toList()));
		bookDto.setVolumes(book.getReleases().stream()
			.map(BookService::convertReleaseToReleaseDto)
			.filter((release) -> release.getReleaseType() == ReleaseTypeEnum.VOLUME)
			.collect(Collectors.toList()));
		return bookDto;
	}
	
	private static BookSummaryDto convertBookToBookSummaryDto(Book book) {
		BookSummaryDto bookSummary = new BookSummaryDto();
		bookSummary.setId(book.getId());
		bookSummary.setTitle(book.getTitle());
		bookSummary.setCreators(book.getCreators().stream()
			.map(BookService::convertCreatorToPersonCreatorDto)
			.collect(Collectors.toList()));
		return bookSummary;
	}
	
	private static PersonCreatorDto convertCreatorToPersonCreatorDto(Creator creator) {
		PersonCreatorDto personCreatorDto = new PersonCreatorDto();
		personCreatorDto.setId(creator.getPerson().getId());
		personCreatorDto.setFirstName(creator.getPerson().getFirstName());
		personCreatorDto.setMiddleName(creator.getPerson().getMiddleName());
		personCreatorDto.setLastName(creator.getPerson().getLastName());
		personCreatorDto.setCreatorType(creator.getCreatorType());
		return personCreatorDto;
	}
	
	private static ReleaseDto convertReleaseToReleaseDto(Release release) {
		ReleaseDto releaseDto = new ReleaseDto();
		releaseDto.setId(release.getId());
		releaseDto.setPublishDate(release.getPublishDate());
		releaseDto.setReleaseType(release.getReleaseType());
		releaseDto.setReleaseNumber(release.getReleaseNumber());
		releaseDto.setDescription(release.getDescription());
		return releaseDto;
	}
}
