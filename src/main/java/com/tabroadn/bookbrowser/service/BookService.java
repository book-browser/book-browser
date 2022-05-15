package com.tabroadn.bookbrowser.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.dto.GenreDto;
import com.tabroadn.bookbrowser.dto.LinkDto;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.PartyCreatorDto;
import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.entity.BookCreator;
import com.tabroadn.bookbrowser.entity.BookCreatorId;
import com.tabroadn.bookbrowser.entity.BookLink;
import com.tabroadn.bookbrowser.entity.BookLinkId;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.entity.Party;
import com.tabroadn.bookbrowser.exception.ImageUploadFailureException;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.BookRepository;
import com.tabroadn.bookbrowser.repository.BookSpecification;
import com.tabroadn.bookbrowser.repository.GenreRepository;
import com.tabroadn.bookbrowser.repository.PartyRepository;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class BookService {
	@Autowired
	private BookRepository repository;

	@Autowired
	private GenreRepository genreRepository;

	@Autowired
	private PartyRepository partyRepository;

	public BookDto getById(Long id) {
		return DtoConversionUtils.convertBookToBookDto(
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
					.map(DtoConversionUtils::convertBookToBookSummaryDto)
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

			if (!genres.isEmpty()) {
				specification = specification.and(BookSpecification.hasGenres(genres));
			}
		}

		Page<Book> books = repository.findAll(specification, pageable);

		if (specification == emptySpecification) {
			return Arrays.asList();
		}

		return books.stream()
				.map(DtoConversionUtils::convertBookToBookSummaryDto)
				.collect(Collectors.toList());
	}

	public PageDto<BookDto> findAll(
			Integer page, Integer size, String sort, OrderEnum order,
			Optional<String> query,
			Optional<LocalDate> startReleaseDate, Optional<LocalDate> endReleaseDate,
			Optional<List<String>> genreNames,
			Optional<LetterEnum> titleStartLetter) {
		validateBookField(sort);

		Pageable pageable = PageRequest.of(page, size);

		Specification<Book> specification = BookSpecification.orderBy(sort, order);

		if (query.isPresent()) {
			specification = specification.and(BookSpecification.hasText(query.get()));
		}

		if (startReleaseDate.isPresent()) {
			specification = specification.and(BookSpecification.releaseDateGreaterThanOrEqual(startReleaseDate.get()));
		}

		if (endReleaseDate.isPresent()) {
			specification = specification.and(BookSpecification.releaseDateLessThanOrEqual(endReleaseDate.get()));
		}

		if (genreNames.isPresent()) {
			List<Genre> genres = genreRepository.findByNameInIgnoreCase(genreNames.get());

			if (!genres.isEmpty()) {
				specification = specification.and(BookSpecification.hasGenres(genres));
			}
		}

		if (titleStartLetter.isPresent()) {
			specification = specification.and(BookSpecification.titleStartsWith(titleStartLetter.get()));
		}

		return new PageDto<>(repository.findAll(specification, pageable)
				.map(DtoConversionUtils::convertBookToBookDto));
	}

	private void validateBookField(String fieldName) {
		try {
			Book.class.getDeclaredField(fieldName);
		} catch (Exception e) {
			throw new IllegalArgumentException(String.format("%s is a not a valid sort parameter", fieldName));
		}
	}

	public BookDto save(BookDto bookDto) {
		Book book = convertBookDtoToBook(bookDto);
		return DtoConversionUtils.convertBookToBookDto(repository.save(book));
	}

	private Book convertBookDtoToBook(BookDto bookDto) {
		Book book = bookDto.getId() != null
				? repository.findById(bookDto.getId())
						.orElseThrow(
								() -> new ResourceNotFoundException(String.format("book with id %s not found", bookDto.getId())))
				: new Book();

		if (bookDto.getTitle() != null) {
			book.setTitle(bookDto.getTitle());
		}

		if (bookDto.getDescription() != null) {
			book.setDescription(bookDto.getDescription());
		}

		if (bookDto.getReleaseDate() != null) {
			book.setReleaseDate(bookDto.getReleaseDate().orElse(null));
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
					.map(creator -> convertPartyCreatorDtoToBookCreator(creator, book))
					.collect(Collectors.toList()));
		}

		if (bookDto.getLinks() != null) {
			book.getLinks().clear();
			book.getLinks().addAll(bookDto.getLinks().stream()
					.map(link -> convertLinkDtoToBookLink(link, book))
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

	private static BookLink convertLinkDtoToBookLink(LinkDto bookLinkDto, Book book) {
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

	private BookCreator convertPartyCreatorDtoToBookCreator(PartyCreatorDto partyCreatorDto, Book book) {
		BookCreator creator = new BookCreator();

		Party party = null;
		if (partyCreatorDto.getId() == null) {
			party = new Party();
			party.setFullName(partyCreatorDto.getFullName());
		} else {
			party = partyRepository.findById(partyCreatorDto.getId())
					.orElseThrow(() -> new ResourceNotFoundException(
							String.format("party with id %s not found", partyCreatorDto.getId())));

			if (book.getId() != null) {
				BookCreatorId creatorId = new BookCreatorId();
				creatorId.setBookId(book.getId());
				creatorId.setPartyId(party.getId());
				creator.setId(creatorId);
			}
		}

		creator.setParty(party);
		creator.setRole(partyCreatorDto.getRole());
		creator.setBook(book);

		return creator;
	}

	private Genre convertGenreDtoToGenre(GenreDto genreDto) {
		return genreRepository.findById(genreDto.getId())
				.orElseThrow(
						() -> new ResourceNotFoundException(String.format("genre with id %s not found", genreDto.getId())));
	}
}
