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
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.SeriesDto;
import com.tabroadn.bookbrowser.entity.Series;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.BookRepository;
import com.tabroadn.bookbrowser.repository.SeriesRepository;
import com.tabroadn.bookbrowser.repository.SeriesSpecification;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;

@Component
public class SeriesService {
	private SeriesRepository seriesRepository;
	
	private BookRepository bookRepository;

	@Autowired
	public SeriesService(SeriesRepository seriesRepository,
			BookRepository bookRepository) {
		this.seriesRepository = seriesRepository; 
		this.bookRepository = bookRepository;
	}
	
	public SeriesDto getById(Long id) {
		return DtoConversionUtils.convertSeriesToSeriesDto(getSeriesById(id));
	}
	
	public byte[] getSeriesBanner(Long id) {
		return getSeriesById(id).getBanner();
	}
	
	public SeriesDto save(SeriesDto seriesDto) {
		Series series = convertSeriesDtoToSeries(seriesDto);
		return DtoConversionUtils.convertSeriesToSeriesDto(seriesRepository.save(series));
	}
	
	public PageDto<SeriesDto> findAll(Integer page, Integer size,
			String sort, OrderEnum order,
			Optional<LetterEnum> titleStartLetter) {
		validateSeriesField(sort);

		Pageable pageable = PageRequest.of(page, size);
		
		Specification<Series> specification = SeriesSpecification.orderBy(sort, order);
		
		if (titleStartLetter.isPresent()) {
			specification = specification.and(SeriesSpecification.titleStartsWith(titleStartLetter.get()));
		}

		return new PageDto<SeriesDto>(seriesRepository.findAll(specification, pageable)
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
				
		if (seriesDto.getBooks() != null) {
			series.getBooks().clear();
			series.getBooks().addAll(
					seriesDto.getBooks().stream()
						.filter((bookDto) -> bookDto.getId() != null)
						.map((bookDto) -> bookRepository.findById(bookDto.getId()).orElseThrow(() -> new ResourceNotFoundException(String.format("book with id %s not found", bookDto.getId()))))
						.collect(Collectors.toList()));			
			series.getBooks()
				.forEach((book) -> book.setSeries(series));
		}
		
		return series;
	}
	
	private Series getSeriesById(Long id) {
		return seriesRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(String.format("series with id %s not found", id)));
	}
}
