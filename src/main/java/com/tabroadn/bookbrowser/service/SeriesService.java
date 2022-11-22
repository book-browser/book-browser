package com.tabroadn.bookbrowser.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.domain.DistributionEnum;
import com.tabroadn.bookbrowser.domain.GenreEnum;
import com.tabroadn.bookbrowser.domain.PricingEnum;
import com.tabroadn.bookbrowser.domain.StatusEnum;
import com.tabroadn.bookbrowser.dto.CreatorDto;
import com.tabroadn.bookbrowser.dto.LinkDto;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.PublisherFormDto;
import com.tabroadn.bookbrowser.dto.SeriesDto;
import com.tabroadn.bookbrowser.dto.SeriesFormDto;
import com.tabroadn.bookbrowser.dto.SeriesSearchCriteriaDto;
import com.tabroadn.bookbrowser.dto.SeriesSummaryDto;
import com.tabroadn.bookbrowser.entity.Distribution;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.entity.Party;
import com.tabroadn.bookbrowser.entity.Pricing;
import com.tabroadn.bookbrowser.entity.Series;
import com.tabroadn.bookbrowser.entity.SeriesCreator;
import com.tabroadn.bookbrowser.entity.SeriesLink;
import com.tabroadn.bookbrowser.entity.SeriesLinkId;
import com.tabroadn.bookbrowser.entity.SeriesPartyId;
import com.tabroadn.bookbrowser.entity.SeriesPublisher;
import com.tabroadn.bookbrowser.entity.Status;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.BookRepository;
import com.tabroadn.bookbrowser.repository.ImageRepository;
import com.tabroadn.bookbrowser.repository.PartyRepository;
import com.tabroadn.bookbrowser.repository.SeriesRepository;
import com.tabroadn.bookbrowser.repository.SeriesSpecification;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;

@Component
public class SeriesService {
  private SeriesRepository seriesRepository;

  private BookRepository bookRepository;

  private PartyRepository partyRepository;

  private ImageRepository imageRepository;

  @Autowired
  public SeriesService(
      SeriesRepository seriesRepository,
      BookRepository bookRepository,
      PartyRepository partyRepository,
      ImageRepository imageRepository) {
    this.seriesRepository = seriesRepository;
    this.bookRepository = bookRepository;
    this.partyRepository = partyRepository;
    this.imageRepository = imageRepository;
  }

  public SeriesDto getById(Long id) {
    return DtoConversionUtils.convertSeriesToSeriesDto(getSeriesById(id));
  }

  public SeriesDto save(SeriesFormDto seriesFormDto) {
    Series series = convertSeriesFormDtoToSeries(seriesFormDto);
    createOrUpdateSeriesImages(series, seriesFormDto);
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

    if (seriesSearchCriteriaDto.getStatus().isPresent()) {
      specification = specification.and(SeriesSpecification.hasStatus(seriesSearchCriteriaDto.getStatus().get()));
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

  private Series convertSeriesFormDtoToSeries(SeriesFormDto seriesFormDto) {
    Series series = seriesFormDto.getId() == null
        ? new Series()
        : seriesRepository
            .findById(seriesFormDto.getId())
            .orElseThrow(
                () -> new ResourceNotFoundException(
                    String.format("series with id %s not found", seriesFormDto.getId())));

    if (seriesFormDto.getTitle().isPresent()) {
      series.setTitle(seriesFormDto.getTitle().get());
    }

    if (seriesFormDto.getDescription().isPresent()) {
      series.setDescription(seriesFormDto.getDescription().get());
    }

    if (seriesFormDto.getStatus().isPresent()) {
      StatusEnum statusEnum = seriesFormDto.getStatus().get();
      series.setStatus(statusEnum == null ? null : new Status(statusEnum.getId()));
    }

    if (seriesFormDto.getGenres().isPresent()) {
      List<GenreEnum> genres = seriesFormDto.getGenres().get();
      series
          .setGenres(genres == null ? new ArrayList<>() : genres.stream().map(Genre::new).collect(Collectors.toList()));
    }

    if (seriesFormDto.getCreators() != null) {
      series.getCreators().clear();
      series
          .getCreators()
          .addAll(
              seriesFormDto.getCreators().stream()
                  .map(creator -> convertPartyCreatorDtoToSeriesCreator(creator, series))
                  .collect(Collectors.toList()));
    }

    if (seriesFormDto.getPublishers() != null) {
      series.getPublishers().clear();
      series
          .getPublishers()
          .addAll(
              seriesFormDto.getPublishers().stream()
                  .map(publisher -> convertPublisherFormDtoToSeriesPublisher(publisher, series))
                  .collect(Collectors.toList()));
    }

    if (seriesFormDto.getLinks() != null) {
      series.getLinks().clear();
      series
          .getLinks()
          .addAll(
              seriesFormDto.getLinks().stream()
                  .map(link -> convertLinkDtoToSeriesLink(link, series))
                  .collect(Collectors.toList()));
    }

    if (seriesFormDto.getBooks() != null) {
      series.getBooks().clear();
      series
          .getBooks()
          .addAll(
              seriesFormDto.getBooks().stream()
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

  private SeriesPublisher convertPublisherFormDtoToSeriesPublisher(
      PublisherFormDto publisherFormDto, Series series) {
    SeriesPublisher publisher = new SeriesPublisher();

    Party party = null;
    if (publisherFormDto.getPartyId() == null) {
      party = new Party();
      if (publisherFormDto.getFullName().isPresent()) {
        party.setFullName(publisherFormDto.getFullName().get());
      }
    } else {
      party = partyRepository
          .findById(publisherFormDto.getPartyId())
          .orElseThrow(
              () -> new ResourceNotFoundException(
                  String.format(
                      "party with id %s not found", publisherFormDto.getPartyId())));

      if (series.getId() != null) {
        SeriesPartyId creatorId = new SeriesPartyId();
        creatorId.setSeriesId(series.getId());
        creatorId.setPartyId(party.getId());
        publisher.setId(creatorId);
      }
    }

    publisher.setParty(party);
    publisher.setSeries(series);

    if (publisherFormDto.getUrl().isPresent()) {
      publisher.setUrl(publisherFormDto.getUrl().get());
    }

    if (publisherFormDto.getEpisodeCount().isPresent()) {
      publisher.setEpisodeCount(publisherFormDto.getEpisodeCount().get());
    }

    if (publisherFormDto.getPricing().isPresent()) {
      PricingEnum pricing = publisherFormDto.getPricing().get();
      publisher.setPricing(pricing == null ? null : new Pricing(pricing.getId()));
    }

    if (publisherFormDto.getCost().isPresent()) {
      publisher.setCost(publisherFormDto.getCost().get());
    }

    if (publisherFormDto.getStatus().isPresent()) {
      StatusEnum status = publisherFormDto.getStatus().get();
      publisher.setStatus(status == null ? null : new Status(status.getId()));
    }

    if (publisherFormDto.getDistribution().isPresent()) {
      DistributionEnum distribution = publisherFormDto.getDistribution().get();
      publisher.setDistribution(distribution == null ? null : new Distribution(distribution.getId()));
    }

    if (publisherFormDto.getPreview().isPresent()) {
      publisher.setPreview(publisherFormDto.getPreview().get());
    }

    return publisher;
  }

  private void createOrUpdateSeriesImages(Series series, SeriesFormDto seriesFormDto) {
    if (seriesFormDto.getThumbnail().isPresent()) {
      if (series.getThumbnailUrl() != null) {
        imageRepository.updateImage(series.getThumbnailUrl(), seriesFormDto.getThumbnail().get());
      } else {
        series.setThumbnailUrl(imageRepository.createImage(seriesFormDto.getThumbnail().get()));
      }
    }

    if (seriesFormDto.getBanner().isPresent()) {
      if (series.getBannerUrl() != null) {
        imageRepository.updateImage(series.getBannerUrl(), seriesFormDto.getBanner().get());
      } else {
        series.setBannerUrl(imageRepository.createImage(seriesFormDto.getBanner().get()));
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
