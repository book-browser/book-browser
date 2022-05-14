package com.tabroadn.bookbrowser.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.LinkDto;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.PersonCreatorDto;
import com.tabroadn.bookbrowser.dto.SeriesDto;
import com.tabroadn.bookbrowser.entity.Person;
import com.tabroadn.bookbrowser.entity.Series;
import com.tabroadn.bookbrowser.entity.SeriesCreator;
import com.tabroadn.bookbrowser.entity.SeriesCreatorId;
import com.tabroadn.bookbrowser.entity.SeriesLink;
import com.tabroadn.bookbrowser.entity.SeriesLinkId;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.BookRepository;
import com.tabroadn.bookbrowser.repository.GenreRepository;
import com.tabroadn.bookbrowser.repository.PersonRepository;
import com.tabroadn.bookbrowser.repository.SeriesRepository;
import com.tabroadn.bookbrowser.repository.SeriesSpecification;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;

@Component
public class SeriesService {
	private SeriesRepository seriesRepository;

	private BookRepository bookRepository;

	private GenreRepository genreRepository;

	private PersonRepository personRepository;

	@Autowired
	public SeriesService(SeriesRepository seriesRepository,
			BookRepository bookRepository,
			GenreRepository genreRepository,
			PersonRepository personRepository) {
		this.seriesRepository = seriesRepository;
		this.bookRepository = bookRepository;
		this.genreRepository = genreRepository;
		this.personRepository = personRepository;
	}

	public SeriesDto getById(Long id) {
		return DtoConversionUtils.convertSeriesToSeriesDto(getSeriesById(id));
	}

	public byte[] getSeriesBanner(Long id) {
		return getSeriesById(id).getBanner();
	}

	public byte[] getSeriesThumbnail(Long id) {
		return getSeriesById(id).getThumbnail();
	}

	public SeriesDto save(SeriesDto seriesDto) {
		Series series = convertSeriesDtoToSeries(seriesDto);
		return DtoConversionUtils.convertSeriesToSeriesDto(seriesRepository.save(series));
	}

	public PageDto<SeriesDto> findAll(
			Integer page, Integer size, String sort, OrderEnum order,
			Optional<String> query, Optional<String> link,
			Optional<LetterEnum> titleStartLetter) {

		Pageable pageable = PageRequest.of(page, size);

		Specification<Series> specification = SeriesSpecification.orderBy(sort, order);

		if (query.isPresent()) {
			specification = specification.and(SeriesSpecification.hasText(query.get()));
		}

		if (titleStartLetter.isPresent()) {
			specification = specification.and(SeriesSpecification.titleStartsWith(titleStartLetter.get()));
		}

		if (link.isPresent()) {
			specification = specification.and(SeriesSpecification.hasLink(link.get()));
		}

		return new PageDto<>(seriesRepository.findAll(specification, pageable)
				.map(DtoConversionUtils::convertSeriesToSeriesDto));
	}

	private Series convertSeriesDtoToSeries(SeriesDto seriesDto) {
		Series series = seriesDto.getId() == null
				? new Series()
				: seriesRepository.findById(seriesDto.getId()).orElseThrow(
						() -> new ResourceNotFoundException(String.format("series with id %s not found", seriesDto.getId())));

		if (seriesDto.getTitle() != null) {
			series.setTitle(seriesDto.getTitle());
		}

		if (seriesDto.getDescription() != null) {
			series.setDescription(seriesDto.getDescription());
		}

		if (seriesDto.getBanner() != null) {
			series.setBanner(seriesDto.getBannerBytes());
		}

		if (seriesDto.getThumbnail() != null) {
			series.setThumbnail(seriesDto.getThumbnailBytes());
		}

		if (seriesDto.getGenres() != null) {
			series.setGenres(
					seriesDto.getGenres()
							.stream()
							.map(genre -> genreRepository.findByNameIgnoreCase(genre).orElseThrow(
									() -> new ResourceNotFoundException(String.format("genre with name %s not found", genre))))
							.collect(Collectors.toList()));
		}

		if (seriesDto.getCreators() != null) {
			series.getCreators().clear();
			series.getCreators().addAll(seriesDto.getCreators().stream()
					.map(creator -> convertPersonCreatorDtoToSeriesCreator(creator, series))
					.collect(Collectors.toList()));
		}

		if (seriesDto.getLinks() != null) {
			series.getLinks().clear();
			series.getLinks().addAll(seriesDto.getLinks().stream()
					.map(link -> convertLinkDtoToSeriesLink(link, series))
					.collect(Collectors.toList()));
		}

		if (seriesDto.getBooks() != null) {
			series.getBooks().clear();
			series.getBooks().addAll(
					seriesDto.getBooks().stream()
							.filter(bookDto -> bookDto.getId() != null)
							.map(bookDto -> bookRepository.findById(bookDto.getId()).orElseThrow(
									() -> new ResourceNotFoundException(String.format("book with id %s not found", bookDto.getId()))))
							.collect(Collectors.toList()));
			series.getBooks()
					.forEach(book -> book.setSeries(series));
		}

		return series;
	}

	private static SeriesLink convertLinkDtoToSeriesLink(LinkDto linkDto, Series series) {
		SeriesLink seriesLink = new SeriesLink();

		if (series.getId() != null) {
			SeriesLinkId seriesLinkId = new SeriesLinkId();
			seriesLinkId.setSeriesId(series.getId());
			seriesLink.setId(seriesLinkId);
		}

		seriesLink.getId().setUrl(linkDto.getUrl());
		seriesLink.setDescription(linkDto.getDescription());
		seriesLink.setSeries(series);
		return seriesLink;
	}

	private SeriesCreator convertPersonCreatorDtoToSeriesCreator(PersonCreatorDto personCreatorDto, Series series) {
		SeriesCreator creator = new SeriesCreator();

		Person person = null;
		if (personCreatorDto.getId() == null) {
			person = new Person();
			person.setFullName(personCreatorDto.getFullName());
		} else {
			person = personRepository.findById(personCreatorDto.getId())
					.orElseThrow(() -> new ResourceNotFoundException(
							String.format("person with id %s not found", personCreatorDto.getId())));

			if (series.getId() != null) {
				SeriesCreatorId creatorId = new SeriesCreatorId();
				creatorId.setSeriesId(series.getId());
				creatorId.setPersonId(person.getId());
				creator.setId(creatorId);
			}
		}

		creator.setPerson(person);
		creator.setRole(personCreatorDto.getRole());
		creator.setSeries(series);
		return creator;
	}

	private Series getSeriesById(Long id) {
		return seriesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException(String.format("series with id %s not found", id)));
	}
}
