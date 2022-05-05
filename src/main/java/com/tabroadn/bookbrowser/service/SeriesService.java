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
import com.tabroadn.bookbrowser.dto.SeriesDto;
import com.tabroadn.bookbrowser.entity.Series;
import com.tabroadn.bookbrowser.entity.SeriesLink;
import com.tabroadn.bookbrowser.entity.SeriesLinkId;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.BookRepository;
import com.tabroadn.bookbrowser.repository.GenreRepository;
import com.tabroadn.bookbrowser.repository.SeriesRepository;
import com.tabroadn.bookbrowser.repository.SeriesSpecification;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;

@Component
public class SeriesService {
	private SeriesRepository seriesRepository;
	
	private BookRepository bookRepository;

	private GenreRepository genreRepository;

	@Autowired
	public SeriesService(SeriesRepository seriesRepository,
			BookRepository bookRepository,
			GenreRepository genreRepository) {
		this.seriesRepository = seriesRepository; 
		this.bookRepository = bookRepository;
		this.genreRepository = genreRepository;
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
	
	public PageDto<SeriesDto> findAll(Integer page, Integer size,
			String sort, Optional<String> link, OrderEnum order,
			Optional<LetterEnum> titleStartLetter) {
		validateSeriesField(sort);

		Pageable pageable = PageRequest.of(page, size);
		
		Specification<Series> specification = SeriesSpecification.orderBy(sort, order);
		
		if (titleStartLetter.isPresent()) {
			specification = specification.and(SeriesSpecification.titleStartsWith(titleStartLetter.get()));
		}

		if (link.isPresent()) {
			specification = specification.and(SeriesSpecification.hasLink(link.get()));
		}

		return new PageDto<>(seriesRepository.findAll(specification, pageable)
				.map(DtoConversionUtils::convertSeriesToSeriesDto));
	}
	
	private void validateSeriesField(String fieldName) {
		try {
			Series.class.getDeclaredField(fieldName);
		} catch (Exception e) {
			throw new IllegalArgumentException(String.format("%s is a not a valid sort parameter", fieldName));
		}
	}

	private Series convertSeriesDtoToSeries(SeriesDto seriesDto) {
		Series series = seriesDto.getId() == null
				? new Series()
				: seriesRepository.findById(seriesDto.getId()).orElseThrow(() -> new ResourceNotFoundException(String.format("series with id %s not found", seriesDto.getId())));
		
		
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
				.map(genre -> genreRepository.findByNameIgnoreCase(genre).orElseThrow(() -> new ResourceNotFoundException(String.format("genre with name %s not found", genre))))
				.collect(Collectors.toList())
			);
		}

		if (seriesDto.getLinks() != null) {
			series.getLinks().clear();
			series.getLinks().addAll(seriesDto.getLinks().stream()
					.map(link -> convertLinkDtoToBookLink(link, series))
					.collect(Collectors.toList()));
		}
				
		if (seriesDto.getBooks() != null) {
			series.getBooks().clear();
			series.getBooks().addAll(
					seriesDto.getBooks().stream()
						.filter(bookDto -> bookDto.getId() != null)
						.map(bookDto -> bookRepository.findById(bookDto.getId()).orElseThrow(() -> new ResourceNotFoundException(String.format("book with id %s not found", bookDto.getId()))))
						.collect(Collectors.toList()));			
			series.getBooks()
				.forEach(book -> book.setSeries(series));
		}
		
		return series;
	}

	private static SeriesLink convertLinkDtoToBookLink(LinkDto linkDto, Series series) {
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
	
	private Series getSeriesById(Long id) {
		return seriesRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("series with id %s not found", id)));
	}
}
