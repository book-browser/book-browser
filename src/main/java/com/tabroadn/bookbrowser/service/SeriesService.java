package com.tabroadn.bookbrowser.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.dto.CreatorDto;
import com.tabroadn.bookbrowser.dto.LinkDto;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.PublisherDto;
import com.tabroadn.bookbrowser.dto.SeriesDto;
import com.tabroadn.bookbrowser.dto.SeriesSearchCriteriaDto;
import com.tabroadn.bookbrowser.dto.SeriesSummaryDto;
import com.tabroadn.bookbrowser.entity.Party;
import com.tabroadn.bookbrowser.entity.Series;
import com.tabroadn.bookbrowser.entity.SeriesCreator;
import com.tabroadn.bookbrowser.entity.SeriesLink;
import com.tabroadn.bookbrowser.entity.SeriesLinkId;
import com.tabroadn.bookbrowser.entity.SeriesPartyId;
import com.tabroadn.bookbrowser.entity.SeriesPublisher;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.BookRepository;
import com.tabroadn.bookbrowser.repository.GenreRepository;
import com.tabroadn.bookbrowser.repository.ImageRepository;
import com.tabroadn.bookbrowser.repository.PartyRepository;
import com.tabroadn.bookbrowser.repository.SeriesRepository;
import com.tabroadn.bookbrowser.repository.SeriesSpecification;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;

@Component
public class SeriesService {
  private SeriesRepository seriesRepository;

  private BookRepository bookRepository;

  private GenreRepository genreRepository;

  private PartyRepository partyRepository;

  private ImageRepository imageRepository;

  @Autowired
  public SeriesService(
      SeriesRepository seriesRepository,
      BookRepository bookRepository,
      GenreRepository genreRepository,
      PartyRepository partyRepository,
      ImageRepository imageRepository) {
    this.seriesRepository = seriesRepository;
    this.bookRepository = bookRepository;
    this.genreRepository = genreRepository;
    this.partyRepository = partyRepository;
    this.imageRepository = imageRepository;
  }

  public SeriesDto getById(Long id) {
    return DtoConversionUtils.convertSeriesToSeriesDto(getSeriesById(id));
  }

  public SeriesDto save(SeriesDto seriesDto) {
    Series series = convertSeriesDtoToSeries(seriesDto);
    createOrUpdateSeriesImages(series, seriesDto);
    return DtoConversionUtils.convertSeriesToSeriesDto(seriesRepository.save(series));
  }

  public void delete(Long id) {
    if (!seriesRepository.existsById(id)) {
      throw new ResourceNotFoundException(String.format("series with id %s not found", id));
    }
    seriesRepository.deleteById(id);
  }

  public PageDto<SeriesSummaryDto> findAll(SeriesSearchCriteriaDto seriesSearchCriteriaDto) {
    Pageable pageable = PageRequest.of(seriesSearchCriteriaDto.getPage(), seriesSearchCriteriaDto.getLimit());

    Specification<Series> specification = SeriesSpecification.orderBy(
        seriesSearchCriteriaDto.getSort(), seriesSearchCriteriaDto.getOrder());

    if (seriesSearchCriteriaDto.getQuery().isPresent()) {
      specification = specification.and(SeriesSpecification.hasText(seriesSearchCriteriaDto.getQuery().get()));
    }

    if (seriesSearchCriteriaDto.getTitleStartsWith().isPresent()) {
      specification = specification.and(
          SeriesSpecification.titleStartsWith(
              seriesSearchCriteriaDto.getTitleStartsWith().get()));
    }

    if (seriesSearchCriteriaDto.getLink().isPresent()) {
      specification = specification.and(SeriesSpecification.hasLink(seriesSearchCriteriaDto.getLink().get()));
    }

    if (seriesSearchCriteriaDto.getGenres().isPresent()
        && !seriesSearchCriteriaDto.getGenres().get().isEmpty()) {
      specification = specification.and(
          SeriesSpecification.hasGenres(seriesSearchCriteriaDto.getGenres().get()));
    }

    return new PageDto<>(
        seriesRepository
            .findAll(specification, pageable)
            .map(DtoConversionUtils::convertSeriesToSeriesSummaryDto));
  }

  private Series convertSeriesDtoToSeries(SeriesDto seriesDto) {
    Series series = seriesDto.getId() == null
        ? new Series()
        : seriesRepository
            .findById(seriesDto.getId())
            .orElseThrow(
                () -> new ResourceNotFoundException(
                    String.format("series with id %s not found", seriesDto.getId())));

    if (seriesDto.getTitle() != null) {
      series.setTitle(seriesDto.getTitle());
    }

    if (seriesDto.getDescription() != null) {
      series.setDescription(seriesDto.getDescription());
    }

    if (seriesDto.getGenres() != null) {
      series.setGenres(
          seriesDto.getGenres().stream()
              .map(
                  genre -> genreRepository
                      .findByNameIgnoreCase(genre)
                      .orElseThrow(
                          () -> new ResourceNotFoundException(
                              String.format("genre with name %s not found", genre))))
              .collect(Collectors.toList()));
    }

    if (seriesDto.getCreators() != null) {
      series.getCreators().clear();
      series
          .getCreators()
          .addAll(
              seriesDto.getCreators().stream()
                  .map(creator -> convertPartyCreatorDtoToSeriesCreator(creator, series))
                  .collect(Collectors.toList()));
    }

    if (seriesDto.getPublishers() != null) {
      series.getPublishers().clear();
      series
          .getPublishers()
          .addAll(
              seriesDto.getPublishers().stream()
                  .map(publisher -> convertPublisherDtoToSeriesPublisher(publisher, series))
                  .collect(Collectors.toList()));
    }

    if (seriesDto.getLinks() != null) {
      series.getLinks().clear();
      series
          .getLinks()
          .addAll(
              seriesDto.getLinks().stream()
                  .map(link -> convertLinkDtoToSeriesLink(link, series))
                  .collect(Collectors.toList()));
    }

    if (seriesDto.getBooks() != null) {
      series.getBooks().clear();
      series
          .getBooks()
          .addAll(
              seriesDto.getBooks().stream()
                  .filter(bookDto -> bookDto.getId() != null)
                  .map(
                      bookDto -> bookRepository
                          .findById(bookDto.getId())
                          .orElseThrow(
                              () -> new ResourceNotFoundException(
                                  String.format(
                                      "book with id %s not found", bookDto.getId()))))
                  .collect(Collectors.toList()));
      series.getBooks().forEach(book -> book.setSeries(series));
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

  private SeriesCreator convertPartyCreatorDtoToSeriesCreator(
      CreatorDto creatorDto, Series series) {
    SeriesCreator creator = new SeriesCreator();

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

      if (series.getId() != null) {
        SeriesPartyId creatorId = new SeriesPartyId();
        creatorId.setSeriesId(series.getId());
        creatorId.setPartyId(party.getId());
        creator.setId(creatorId);
      }
    }

    creator.setParty(party);
    creator.setRole(creatorDto.getRole());
    creator.setSeries(series);
    return creator;
  }

  private SeriesPublisher convertPublisherDtoToSeriesPublisher(
      PublisherDto publisherDto, Series series) {
    SeriesPublisher publisher = new SeriesPublisher();

    Party party = null;
    if (publisherDto.getPartyId() == null || publisherDto.getPartyId().isEmpty()) {
      party = new Party();
      if (publisherDto.getFullName() != null && publisherDto.getFullName().isPresent()) {
        party.setFullName(publisherDto.getFullName().get());
      }
    } else {
      party = partyRepository
          .findById(publisherDto.getPartyId().get())
          .orElseThrow(
              () -> new ResourceNotFoundException(
                  String.format(
                      "party with id %s not found", publisherDto.getPartyId().get())));

      if (series.getId() != null) {
        SeriesPartyId creatorId = new SeriesPartyId();
        creatorId.setSeriesId(series.getId());
        creatorId.setPartyId(party.getId());
        publisher.setId(creatorId);
      }
    }

    if (publisherDto.getUrl() != null && publisherDto.getUrl().isPresent()) {
      publisher.setUrl(publisherDto.getUrl().get());
    }

    publisher.setParty(party);
    publisher.setSeries(series);
    return publisher;
  }

  private void createOrUpdateSeriesImages(Series series, SeriesDto seriesDto) {
    if (seriesDto.getThumbnail() != null && seriesDto.getThumbnail().isPresent()) {
      if (series.getThumbnailUrl() != null) {
        imageRepository.updateImage(series.getThumbnailUrl(), seriesDto.getThumbnail().get());
      } else {
        series.setThumbnailUrl(imageRepository.createImage(seriesDto.getThumbnail().get()));
      }
    }

    if (seriesDto.getBanner() != null && seriesDto.getBanner().isPresent()) {
      if (series.getBannerUrl() != null) {
        imageRepository.updateImage(series.getBannerUrl(), seriesDto.getBanner().get());
      } else {
        series.setBannerUrl(imageRepository.createImage(seriesDto.getBanner().get()));
      }
    }
  }

  private Series getSeriesById(Long id) {
    return seriesRepository
        .findById(id)
        .orElseThrow(
            () -> new ResourceNotFoundException(String.format("series with id %s not found", id)));
  }
}
