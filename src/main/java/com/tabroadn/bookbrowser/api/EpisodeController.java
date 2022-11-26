package com.tabroadn.bookbrowser.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.dto.EpisodeDto;
import com.tabroadn.bookbrowser.dto.EpisodeSearchCriteriaDto;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.service.EpisodeService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Validated
@RequestMapping("/api")
@Slf4j
public class EpisodeController {
  private EpisodeService episodeService;

  @Autowired
  public EpisodeController(EpisodeService episodeService) {
    this.episodeService = episodeService;
  }

  @Valid
  @PutMapping(value = "/episode")
  public EpisodeDto createOrUpdate(@Valid @RequestBody EpisodeDto episodeDto) {
    return episodeService.createOrUpdate(episodeDto);
  }

  @GetMapping(value = "/episode/{id}")
  public EpisodeDto getById(@PathVariable("id") Long id) {
    return episodeService.getById(id);
  }

  @GetMapping("/episodes")
  public PageDto<EpisodeDto> findAll(@Valid EpisodeSearchCriteriaDto criteriaDto) {
    return episodeService.findAll(criteriaDto);
  }
}
