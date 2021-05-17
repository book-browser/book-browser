package com.tabroadn.bookbrowser.service;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.domain.ReleaseTypeEnum;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookForm;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.dto.PersonCreatorDto;
import com.tabroadn.bookbrowser.dto.ReleaseDto;
import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.entity.Creator;
import com.tabroadn.bookbrowser.entity.Person;
import com.tabroadn.bookbrowser.entity.Release;
import com.tabroadn.bookbrowser.exception.ImageUploadFailureException;
import com.tabroadn.bookbrowser.repository.BookRepository;
import com.tabroadn.bookbrowser.repository.CreatorRepository;

@Component
public class BookService {
	@Autowired
	private BookRepository repository;
	
	@Autowired
	private CreatorRepository creatorRepository;

	public BookDto findById(Long id) {
		return convertBookToBookDto(repository.findById(id).get());
	}	
	
	public byte[] findBookThumbnail(Long id) {
		return repository.findById(id).get().getThumbnail();
	}
	
	public List<BookSummaryDto> search(String query, int limit) {
		String[] terms = query.split(" ");
		
		Set<Book> books = new HashSet<>();
		
		for (String term : terms) {
			books.addAll(repository.search(term));
		}
		
		return books.stream()
					.limit(limit)
					.map(BookService::convertBookToBookSummaryDto)
					.collect(Collectors.toList());
	}

	public BookDto save(BookForm bookForm) {
		Book book = convertBookFormToBook(bookForm);
		Book newBook = repository.save(book);
		return convertBookToBookDto(newBook);
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
		bookSummary.setDescription(book.getDescription());
		bookSummary.setCreators(book.getCreators().stream()
			.map(BookService::convertCreatorToPersonCreatorDto)
			.collect(Collectors.toList()));
		return bookSummary;
	}
	
	private Book convertBookFormToBook(BookForm bookForm) {
		Book book = new Book();
		book.setId(bookForm.getId());
		book.setTitle(bookForm.getTitle());
		book.setDescription(bookForm.getDescription());
		book.setCreators(bookForm.getCreators().stream()
				.map((creator) -> {
					if (creator.getId() == null) {
						Creator newCreator = convertPersonCreatorDtoToCreator(creator);
						newCreator.setBook(book);
						return newCreator;
					} else {
						return creatorRepository.findByPersonId(creator.getId());
					}
				})
				.collect(Collectors.toList()));
				
		try {
			if (bookForm.getThumbnail() != null) {
				book.setThumbnail(bookForm.getThumbnail().getBytes());
			}
		} catch (IOException e) {
			throw new ImageUploadFailureException(bookForm.getThumbnail(), e);
		}
		
		return book;
	}
	
	private static Creator convertPersonCreatorDtoToCreator(PersonCreatorDto personCreatorDto) {
		Person person = new Person();
		person.setFullName(personCreatorDto.getFullName());
		
		Creator creator = new Creator();
		creator.setPerson(person);
		creator.setRole(personCreatorDto.getRole());
		
		return creator;
	}
	
	private static PersonCreatorDto convertCreatorToPersonCreatorDto(Creator creator) {
		PersonCreatorDto personCreatorDto = new PersonCreatorDto();
		personCreatorDto.setId(creator.getPerson().getId());
		personCreatorDto.setFullName(creator.getPerson().getFullName());
		personCreatorDto.setRole(creator.getRole());
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
