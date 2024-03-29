package com.tabroadn.bookbrowser.util;

import com.tabroadn.bookbrowser.domain.DistributionEnum;
import com.tabroadn.bookbrowser.domain.GenreEnum;
import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.PricingEnum;
import com.tabroadn.bookbrowser.domain.StatusEnum;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.dto.CreatorDto;
import com.tabroadn.bookbrowser.dto.EpisodeDto;
import com.tabroadn.bookbrowser.dto.GenreDto;
import com.tabroadn.bookbrowser.dto.LetterDto;
import com.tabroadn.bookbrowser.dto.LinkDto;
import com.tabroadn.bookbrowser.dto.PartyDto;
import com.tabroadn.bookbrowser.dto.PublisherDto;
import com.tabroadn.bookbrowser.dto.SeriesDto;
import com.tabroadn.bookbrowser.dto.SeriesSummaryDto;
import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.entity.BookCreator;
import com.tabroadn.bookbrowser.entity.BookLink;
import com.tabroadn.bookbrowser.entity.Episode;
import com.tabroadn.bookbrowser.entity.EpisodeLink;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.entity.Party;
import com.tabroadn.bookbrowser.entity.Series;
import com.tabroadn.bookbrowser.entity.SeriesCreator;
import com.tabroadn.bookbrowser.entity.SeriesLink;
import com.tabroadn.bookbrowser.entity.SeriesPublisher;
import java.util.Optional;
import java.util.stream.Collectors;

public class DtoConversionUtils {

  private DtoConversionUtils() {
  }

  public static GenreDto convertGenreToGenreDto(Genre genre) {
    GenreDto genreDto = new GenreDto();
    genreDto.setId(genre.getId());
    genreDto.setName(genre.getName());
    return genreDto;
  }

  public static LinkDto convertBookLinkToBookLinkDto(BookLink bookLink) {
    LinkDto linkDto = new LinkDto();
    linkDto.setDescription(bookLink.getDescription());
    linkDto.setUrl(bookLink.getId().getUrl());
    return linkDto;
  }

  public static LinkDto convertSeriesLinkToLinkDto(SeriesLink seriesLink) {
    LinkDto linkDto = new LinkDto();
    linkDto.setDescription(seriesLink.getDescription());
    linkDto.setUrl(seriesLink.getId().getUrl());
    return linkDto;
  }

  public static LinkDto convertEpisodeLinkToLinkDto(EpisodeLink episodeLink) {
    LinkDto linkDto = new LinkDto();
    linkDto.setDescription(episodeLink.getDescription());
    linkDto.setUrl(episodeLink.getId().getUrl());
    return linkDto;
  }

  public static LetterDto convertLetterEnumToLetterDto(LetterEnum letterEnum) {
    LetterDto letterDto = new LetterDto();
    letterDto.setLabel(letterEnum.getLabel());
    letterDto.setValue(letterEnum.name());
    return letterDto;
  }

  public static SeriesDto convertSeriesToSeriesDto(Series series) {
    SeriesDto seriesDto = new SeriesDto();
    seriesDto.setId(series.getId());
    seriesDto.setTitle(series.getTitle());
    seriesDto.setUrlTitle(series.getUrlTitle());
    seriesDto.setDescription(series.getDescription());
    seriesDto.setBannerUrl(series.getBannerUrl());
    seriesDto.setThumbnailUrl(series.getThumbnailUrl());
    seriesDto.setStartDate(series.getStartDate());
    seriesDto.setLastUpdated(series.getLastUpdated());
    seriesDto.setStatus(series.getStatus() == null ? null
        : StatusEnum.valueOfId(
            series.getStatus().getId()));
    seriesDto.setLastUpdated(series.getLastUpdated());
    seriesDto.setCreators(
        series.getCreators().stream()
            .map(DtoConversionUtils::convertSeriesCreatorToPartyCreatorDto)
            .collect(Collectors.toList()));
    seriesDto.setGenres(
        series.getGenres().stream().map(GenreEnum::valueOfGenre).collect(Collectors.toList()));
    seriesDto.setLinks(
        series.getLinks().stream()
            .map(DtoConversionUtils::convertSeriesLinkToLinkDto)
            .collect(Collectors.toList()));
    seriesDto.setPublishers(
        series.getPublishers().stream()
            .map(DtoConversionUtils::convertSeriesCreatorToPublisherDto)
            .collect(Collectors.toList()));
    seriesDto.setBooks(series.getBooks()
        .stream().map(DtoConversionUtils::convertBookToBookDto)
        .collect(Collectors.toList()));
    seriesDto.setEpisodes(series.getEpisodes()
        .stream().map(DtoConversionUtils::convertEpisodeToEpisodeDto)
        .collect(Collectors.toList()));

    return seriesDto;
  }

  public static SeriesSummaryDto convertSeriesToSeriesSummaryDto(Series series) {
    SeriesSummaryDto seriesSummaryDto = new SeriesSummaryDto();
    seriesSummaryDto.setId(series.getId());
    seriesSummaryDto.setTitle(series.getTitle());
    seriesSummaryDto.setUrlTitle(series.getUrlTitle());
    seriesSummaryDto.setDescription(series.getDescription());
    seriesSummaryDto.setLastUpdated(series.getLastUpdated());
    seriesSummaryDto.setThumbnailUrl(series.getThumbnailUrl());
    seriesSummaryDto.setBannerUrl(series.getBannerUrl());
    seriesSummaryDto.setStatus(series.getStatus() == null ? null
        : StatusEnum.valueOfId(
            series.getStatus().getId()));
    seriesSummaryDto.setCreators(
        series.getCreators().stream()
            .map(DtoConversionUtils::convertSeriesCreatorToPartyCreatorDto)
            .collect(Collectors.toList()));
    seriesSummaryDto.setGenres(
        series.getGenres().stream().map(GenreEnum::valueOfGenre).collect(Collectors.toList()));
    seriesSummaryDto.setLinks(
        series.getLinks().stream()
            .map(DtoConversionUtils::convertSeriesLinkToLinkDto)
            .collect(Collectors.toList()));
    seriesSummaryDto.setPublishers(
        series.getPublishers().stream()
            .map(DtoConversionUtils::convertSeriesCreatorToPublisherDto)
            .collect(Collectors.toList()));
    return seriesSummaryDto;
  }

  public static BookDto convertBookToBookDto(Book book) {
    BookDto bookDto = new BookDto();
    bookDto.setId(book.getId());
    Series series = book.getSeries();
    if (series != null) {
      bookDto.setSeriesId(series.getId());
      bookDto.setSeriesTitle(series.getTitle());
    }
    bookDto.setTitle(book.getTitle());
    bookDto.setDescription(book.getDescription());
    bookDto.setReleaseDate(Optional.ofNullable(book.getReleaseDate()));
    bookDto.setThumbnailUrl(book.getThumbnailUrl());
    bookDto.setCreators(
        book.getCreators().stream()
            .map(DtoConversionUtils::convertBookCreatorToPartyCreatorDto)
            .collect(Collectors.toList()));
    bookDto.setGenres(
        book.getGenres().stream()
            .map(DtoConversionUtils::convertGenreToGenreDto)
            .collect(Collectors.toList()));
    bookDto.setLinks(
        book.getLinks().stream()
            .map(DtoConversionUtils::convertBookLinkToBookLinkDto)
            .collect(Collectors.toList()));
    return bookDto;
  }

  public static BookSummaryDto convertBookToBookSummaryDto(Book book) {
    BookSummaryDto bookSummary = new BookSummaryDto();
    bookSummary.setId(book.getId());
    bookSummary.setTitle(book.getTitle());
    bookSummary.setDescription(book.getDescription());
    bookSummary.setThumbnailUrl(book.getThumbnailUrl());
    bookSummary.setCreators(
        book.getCreators().stream()
            .map(DtoConversionUtils::convertBookCreatorToPartyCreatorDto)
            .collect(Collectors.toList()));
    return bookSummary;
  }

  public static CreatorDto convertBookCreatorToPartyCreatorDto(BookCreator creator) {
    CreatorDto creatorDto = new CreatorDto();
    creatorDto.setPartyId(creator.getParty().getId());
    creatorDto.setFullName(creator.getParty().getFullName());
    creatorDto.setRole(creator.getRole());
    return creatorDto;
  }

  public static CreatorDto convertSeriesCreatorToPartyCreatorDto(SeriesCreator creator) {
    CreatorDto creatorDto = new CreatorDto();
    creatorDto.setPartyId(creator.getParty().getId());
    creatorDto.setFullName(creator.getParty().getFullName());
    creatorDto.setRole(creator.getRole());
    return creatorDto;
  }

  public static PublisherDto convertSeriesCreatorToPublisherDto(SeriesPublisher publisher) {
    PublisherDto publisherDto = new PublisherDto();
    publisherDto.setPartyId(publisher.getParty().getId());
    publisherDto.setFullName(publisher.getParty().getFullName());
    publisherDto.setUrlName(publisher.getParty().getUrlName());
    publisherDto.setUrl(publisher.getUrl());
    publisherDto.setEpisodeCount(publisher.getEpisodeCount());
    publisherDto
        .setPricing(publisher.getPricing() == null ? null : PricingEnum.valueOfId(publisher.getPricing().getId()));
    publisherDto.setCost(publisher.getCost());
    publisherDto.setStatus(publisher.getStatus() == null ? null
        : StatusEnum.valueOfId(
            publisher.getStatus().getId()));
    publisherDto.setDistribution(
        publisher.getDistribution() == null ? null : DistributionEnum.valueOfId(publisher.getDistribution().getId()));
    publisherDto.setPreview(publisher.getPreview());
    return publisherDto;
  }

  public static EpisodeDto convertEpisodeToEpisodeDto(Episode episode) {
    EpisodeDto episodeDto = new EpisodeDto();
    episodeDto.setSeriesId(Optional.ofNullable(episode.getSeries().getId()));
    episodeDto.setSeriesTitle(Optional.ofNullable(episode.getSeries().getTitle()));
    episodeDto.setSeriesUrlTitle(episode.getSeries().getUrlTitle());
    episodeDto.setId(episode.getId());
    episodeDto.setTitle(Optional.ofNullable(episode.getTitle()));
    episodeDto.setDescription(Optional.ofNullable(episode.getDescription()));
    episodeDto.setReleaseDate(Optional.ofNullable(episode.getReleaseDate()));
    episodeDto.setThumbnailUrl(episode.getThumbnailUrl());
    episodeDto.setLinks(
        Optional.ofNullable(
            episode.getLinks().stream()
                .map(DtoConversionUtils::convertEpisodeLinkToLinkDto)
                .collect(Collectors.toList())));
    return episodeDto;
  }

  public static PartyDto convertPartyToPartyDto(Party party) {
    PartyDto partyDto = new PartyDto();
    partyDto.setId(party.getId());
    partyDto.setFullName(Optional.ofNullable(party.getFullName()));
    partyDto.setUrlName(party.getUrlName());
    partyDto.setDescription(Optional.ofNullable(party.getDescription()));
    partyDto.setHasPicture(party.getPicture() != null);
    return partyDto;
  }
}
