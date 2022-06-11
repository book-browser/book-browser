package com.tabroadn.bookbrowser.service;

import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.EpisodeDto;
import com.tabroadn.bookbrowser.dto.LinkDto;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.entity.Episode;
import com.tabroadn.bookbrowser.entity.EpisodeLink;
import com.tabroadn.bookbrowser.entity.EpisodeLinkId;
import com.tabroadn.bookbrowser.entity.Series;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.EpisodeRepository;
import com.tabroadn.bookbrowser.repository.EpisodeSpecification;
import com.tabroadn.bookbrowser.repository.SeriesRepository;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EpisodeService {
  private EpisodeRepository episodeRepository;
  private SeriesRepository seriesRepository;

  @Autowired
  public EpisodeService(EpisodeRepository episodeRepository, SeriesRepository seriesRepository) {
    this.episodeRepository = episodeRepository;
    this.seriesRepository = seriesRepository;
  }

  public EpisodeDto createOrUpdate(EpisodeDto episodeDto) {
    Episode episode = convertEpisodeDtoToEpisode(episodeDto);
    return DtoConversionUtils.convertEpisodeToEpisodeDto(episodeRepository.save(episode));
  }

  public EpisodeDto getById(Long id) {
    return DtoConversionUtils.convertEpisodeToEpisodeDto(getEpisodeById(id));
  }

  public byte[] getEpisodeThumbnail(Long id) {
    return getEpisodeById(id).getThumbnail();
  }

  private Episode convertEpisodeDtoToEpisode(EpisodeDto episodeDto) {
    Episode episode = episodeDto.getId() != null ? getEpisodeById(episodeDto.getId()) : new Episode();

    if (episodeDto.getTitle() != null) {
      episode.setTitle(episodeDto.getTitle().orElse(null));
    }

    if (episodeDto.getDescription() != null) {
      episode.setDescription(episodeDto.getDescription().orElse(null));
    }

    if (episodeDto.getReleaseDate() != null) {
      episode.setReleaseDate(episodeDto.getReleaseDate().orElse(null));
    }

    if (episodeDto.getThumbnail() != null) {
      episode.setThumbnail(episodeDto.getThumbnailBytes());
    }

    if (episodeDto.getLinks() != null) {
      if (episodeDto.getLinks().isPresent()) {
        episode.getLinks().clear();
        episode
            .getLinks()
            .addAll(
                episodeDto.getLinks().get().stream()
                    .map((linkDto) -> convertLinkDtoToEpisodeLink(linkDto, episode))
                    .collect(Collectors.toList()));
      } else {
        episode.setLinks(null);
      }
    }

    if (episodeDto.getSeriesId() != null) {
      if (episodeDto.getSeriesId().isPresent()) {
        Series series = seriesRepository
            .findById(episodeDto.getSeriesId().get())
            .orElseThrow(
                () -> new ResourceNotFoundException(
                    String.format(
                        "series with id %s not found", episodeDto.getSeriesId().get())));
        if (!series.getEpisodes().contains(episode)) {
          episode.setSeries(series);
          series.getEpisodes().add(episode);
        }
      } else {
        episode.setSeries(null);
      }
    }

    return episode;
  }

  private static EpisodeLink convertLinkDtoToEpisodeLink(LinkDto linkDto, Episode episode) {
    EpisodeLink episodeLink = new EpisodeLink();

    if (episode.getId() != null) {
      EpisodeLinkId episodeLinkId = new EpisodeLinkId();
      episodeLinkId.setEpisodeId(episode.getId());
      episodeLink.setId(episodeLinkId);
    }

    episodeLink.getId().setUrl(linkDto.getUrl());
    episodeLink.setDescription(linkDto.getDescription());
    episodeLink.setEpisode(episode);
    return episodeLink;
  }

  private Episode getEpisodeById(Long id) {
    return episodeRepository
        .findById(id)
        .orElseThrow(
            () -> new ResourceNotFoundException(String.format("episode with id %s not found", id)));
  }

  public PageDto<EpisodeDto> findAll(
      Integer page, Integer size, String sort, OrderEnum order, Optional<Long> seriesId) {

    validateEpisodeField(sort);

    Pageable pageable = PageRequest.of(page, size);

    Specification<Episode> specification = EpisodeSpecification.orderBy(sort, order);

    if (seriesId.isPresent()) {
      specification = specification.and(EpisodeSpecification.seriesIdEqual(seriesId.get()));
    }

    return new PageDto<>(
        episodeRepository
            .findAll(specification, pageable)
            .map(DtoConversionUtils::convertEpisodeToEpisodeDto));
  }

  private void validateEpisodeField(String fieldName) {
    try {
      Episode.class.getDeclaredField(fieldName);
    } catch (Exception e) {
      throw new IllegalArgumentException(
          String.format("%s is a not a valid sort parameter", fieldName));
    }
  }
}
