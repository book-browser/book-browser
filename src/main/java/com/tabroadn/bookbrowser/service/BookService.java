package com.tabroadn.bookbrowser.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.dto.CreatorDto;
import com.tabroadn.bookbrowser.dto.GenreDto;
import com.tabroadn.bookbrowser.dto.LinkDto;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.entity.BookCreator;
import com.tabroadn.bookbrowser.entity.BookCreatorId;
import com.tabroadn.bookbrowser.entity.BookLink;
import com.tabroadn.bookbrowser.entity.BookLinkId;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.entity.Party;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.BookRepository;
import com.tabroadn.bookbrowser.repository.BookSpecification;
import com.tabroadn.bookbrowser.repository.GenreRepository;
import com.tabroadn.bookbrowser.repository.ImageRepository;
import com.tabroadn.bookbrowser.repository.PartyRepository;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;

@Component
public class BookService {
  @Autowired
  private BookRepository repository;

  @Autowired
  private GenreRepository genreRepository;

  @Autowired
  private PartyRepository partyRepository;

  @Autowired
  private ImageRepository imageRepository;

  public BookDto getById(Long id) {
    return DtoConversionUtils.convertBookToBookDto(
        repository
            .findById(id)
            .orElseThrow(
                () -> new ResourceNotFoundException(String.format("book with id %s not found", id))));
  }

  public List<BookSummaryDto> search(
      int page, int size, Optional<String> query, Optional<List<String>> genreNames) {
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
      Integer page,
      Integer size,
      String sort,
      OrderEnum order,
      Optional<String> query,
      Optional<LocalDate> startReleaseDate,
      Optional<LocalDate> endReleaseDate,
      Optional<List<String>> genreNames,
      Optional<LetterEnum> titleStartLetter) {
    validateBookField(sort);

    Pageable pageable = PageRequest.of(page, size);

    Specification<Book> specification = BookSpecification.orderBy(sort, order);

    if (query.isPresent()) {
      specification = specification.and(BookSpecification.hasText(query.get()));
    }

    if (startReleaseDate.isPresent()) {
      specification = specification.and(
          BookSpecification.releaseDateGreaterThanOrEqual(startReleaseDate.get()));
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

    return new PageDto<>(
        repository.findAll(specification, pageable).map(DtoConversionUtils::convertBookToBookDto));
  }

  private void validateBookField(String fieldName) {
    try {
      Book.class.getDeclaredField(fieldName);
    } catch (Exception e) {
      throw new IllegalArgumentException(
          String.format("%s is a not a valid sort parameter", fieldName));
    }
  }

  @Transactional
  public BookDto save(BookDto bookDto) {
    Book book = convertBookDtoToBook(bookDto);
    createOrUpdateBookImages(book, bookDto);
    return DtoConversionUtils.convertBookToBookDto(repository.save(book));
  }

  private Book convertBookDtoToBook(BookDto bookDto) {
    Book book = bookDto.getId() != null
        ? repository
            .findById(bookDto.getId())
            .orElseThrow(
                () -> new ResourceNotFoundException(
                    String.format("book with id %s not found", bookDto.getId())))
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

    if (bookDto.getCreators() != null) {
      book.getCreators().clear();
      book.getCreators()
          .addAll(
              bookDto.getCreators().stream()
                  .map(creator -> convertPartyCreatorDtoToBookCreator(creator, book))
                  .collect(Collectors.toList()));
    }

    if (bookDto.getLinks() != null) {
      book.getLinks().clear();
      book.getLinks()
          .addAll(
              bookDto.getLinks().stream()
                  .map(link -> convertLinkDtoToBookLink(link, book))
                  .collect(Collectors.toList()));
    }

    if (bookDto.getGenres() != null) {
      book.getGenres().clear();
      book.getGenres()
          .addAll(
              bookDto.getGenres().stream()
                  .filter(genreDto -> genreDto.getId() != null)
                  .map(this::convertGenreDtoToGenre)
                  .collect(Collectors.toList()));
    }

    return book;
  }

  private void createOrUpdateBookImages(Book book, BookDto bookDto) {
    if (bookDto.getThumbnail() != null) {
      if (book.getThumbnailUrl() != null) {
        imageRepository.updateImage(book.getThumbnailUrl(), bookDto.getThumbnail());
      } else {
        book.setThumbnailUrl(imageRepository.createImage(bookDto.getThumbnail()));
      }
    }
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

  private BookCreator convertPartyCreatorDtoToBookCreator(CreatorDto creatorDto, Book book) {
    BookCreator creator = new BookCreator();

    Party party = null;
    if (creatorDto.getPartyId() == null) {
      party = new Party();
      party.setFullName(creatorDto.getFullName());
    } else {
      party = partyRepository
          .findById(creatorDto.getPartyId())
          .orElseThrow(
              () -> new ResourceNotFoundException(
                  String.format("party with id %s not found", creatorDto.getPartyId())));

      if (book.getId() != null) {
        BookCreatorId creatorId = new BookCreatorId();
        creatorId.setBookId(book.getId());
        creatorId.setPartyId(party.getId());
        creator.setId(creatorId);
      }
    }

    creator.setParty(party);
    creator.setRole(creatorDto.getRole());
    creator.setBook(book);

    return creator;
  }

  private Genre convertGenreDtoToGenre(GenreDto genreDto) {
    return genreRepository
        .findById(genreDto.getId())
        .orElseThrow(
            () -> new ResourceNotFoundException(
                String.format("genre with id %s not found", genreDto.getId())));
  }
}
