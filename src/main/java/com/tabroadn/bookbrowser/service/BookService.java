package com.tabroadn.bookbrowser.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.domain.ReleaseTypeEnum;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookLinkDto;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.dto.GenreDto;
import com.tabroadn.bookbrowser.dto.PersonCreatorDto;
import com.tabroadn.bookbrowser.dto.ReleaseDto;
import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.entity.BookLink;
import com.tabroadn.bookbrowser.entity.BookLinkId;
import com.tabroadn.bookbrowser.entity.Creator;
import com.tabroadn.bookbrowser.entity.CreatorId;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.entity.Person;
import com.tabroadn.bookbrowser.entity.Release;
import com.tabroadn.bookbrowser.exception.ImageUploadFailureException;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.BookRepository;
import com.tabroadn.bookbrowser.repository.BookSpecification;
import com.tabroadn.bookbrowser.repository.GenreRepository;
import com.tabroadn.bookbrowser.repository.PersonRepository;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;

@Component
public class BookService {
	@Autowired
	private BookRepository repository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	@Autowired
	private PersonRepository personRepository;

	public BookDto getById(Long id) {
		return convertBookToBookDto(
				repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(String.format("book with id %s not found", id))));
	}	
	
	public byte[] findBookThumbnail(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(String.format("book with id %s not found", id)))
				.getThumbnail();
	}

	public List<BookSummaryDto> search(int page, int size, Optional<String> query, Optional<List<String>> genreNames) {
		if (Stream.of(query, genreNames).allMatch(Optional::isEmpty)) {
			long count = repository.count();
			int randomPage = (int) (Math.random() * count / size);
			return repository.findAll(PageRequest.of(randomPage, size)).stream()
					.map(BookService::convertBookToBookSummaryDto)
					.collect(Collectors.toList());
		}
		
		Pageable pageable = PageRequest.of(page, size);
		
		Specification<Book> emptySpecification = Specification.where(null);
		Specification<Book> specification = emptySpecification;
		
		if (query.isPresent()) {
			specification = specification.and(BookSpecification.hasText(query.get()));
		}
		
		if (genreNames.isPresent()) {
			List<Genre> genres = genreRepository.findByNameInIgnoreCase(genreNames.get());
			
			if (genres.size() > 0) {
				specification = specification.and(BookSpecification.hasGenres(genres));
			}
		}
		
		Page<Book> books = repository.findAll(specification, pageable);

		if (specification == emptySpecification) {
			return Arrays.asList();
		}

		return books.stream()
					.map(BookService::convertBookToBookSummaryDto)
					.collect(Collectors.toList());
	}

	public BookDto save(BookDto bookDto) {
		Book book = convertBookDtoToBook(bookDto);
		return convertBookToBookDto(repository.save(book));
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
		bookDto.setGenres(book.getGenres().stream()
				.map(DtoConversionUtils::convertGenreToGenreDto)
				.collect(Collectors.toList()));
		bookDto.setLinks(book.getLinks().stream()
				.map(DtoConversionUtils::convertBookLinkToBookLinkDto)
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
	
	private Book convertBookDtoToBook(BookDto bookDto) {
		Book book = bookDto.getId() != null
				? repository.findById(bookDto.getId())
						.orElseThrow(() -> new ResourceNotFoundException(String.format("book with id %s not found", bookDto.getId())))
				: new Book();

		if (bookDto.getTitle() != null) {
			book.setTitle(bookDto.getTitle());
		}

		if (bookDto.getDescription() != null) {
			book.setDescription(bookDto.getDescription());
		}
		
		if (bookDto.getThumbnail() != null) {
			try {
				book.setThumbnail(bookDto.getThumbnailBytes());
			} catch (IllegalArgumentException e) {
				throw new ImageUploadFailureException("Unable upload image with invalid base64 scheme", e);
			}
		}

		if (bookDto.getCreators() != null) {
			book.getCreators().clear();
			book.getCreators().addAll(bookDto.getCreators().stream()
					.map((creator) -> convertPersonCreatorDtoToCreator(creator, book))
					.collect(Collectors.toList()));
		}

		if (bookDto.getLinks() != null) {
			book.getLinks().clear();
			book.getLinks().addAll(bookDto.getLinks().stream()
					.map((link) -> convertBookLinkDtoToBookLink(link, book))
					.collect(Collectors.toList()));
		}
		

		if (bookDto.getGenres() != null) {
			book.getGenres().clear();
			book.getGenres().addAll(bookDto.getGenres().stream()
					.filter(genreDto -> genreDto.getId() != null)
					.map(this::convertGenreDtoToGenre)
					.collect(Collectors.toList()));
		}

		return book;
	}
	
	private static BookLink convertBookLinkDtoToBookLink(BookLinkDto bookLinkDto, Book book) {
		BookLink bookLink = new BookLink();
		
		if (book.getId() != null) {
			BookLinkId bookLinkId = new BookLinkId();
			bookLinkId.setBookId(book.getId());
			bookLink.setId(bookLinkId);
		}

		bookLink.getId().setUrl(bookLinkDto.getUrl());
		bookLink.setDescription(bookLinkDto.getDescription());
		bookLink.setBook(book);
		return bookLink;
	}

	private Creator convertPersonCreatorDtoToCreator(PersonCreatorDto personCreatorDto, Book book) {
		Creator creator = new Creator();
		
		Person person = null;
		if (personCreatorDto.getId() == null) {
			person = new Person();
			person.setFullName(personCreatorDto.getFullName());
		} else {
			person = personRepository.findById(personCreatorDto.getId())
					.orElseThrow(() -> new ResourceNotFoundException(String.format("person with id %s not found", personCreatorDto.getId())));
			
			if (book.getId() != null) {
				CreatorId creatorId = new CreatorId();
				creatorId.setBookId(book.getId());
				creatorId.setPersonId(person.getId());
				creator.setId(creatorId);
			}
		}

		creator.setPerson(person);
		creator.setRole(personCreatorDto.getRole());
		creator.setBook(book);

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
	
	private Genre convertGenreDtoToGenre(GenreDto genreDto) {
		return genreRepository.findById(genreDto.getId())
				.orElseThrow(() -> new ResourceNotFoundException(String.format("genre with id %s not found", genreDto.getId())));
	}
}
