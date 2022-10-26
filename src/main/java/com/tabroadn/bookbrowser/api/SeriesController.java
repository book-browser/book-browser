package com.tabroadn.bookbrowser.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.config.CaseInsensitiveEnumEditor;
import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.SeriesDto;
import com.tabroadn.bookbrowser.dto.SeriesSearchCriteriaDto;
import com.tabroadn.bookbrowser.dto.SeriesSummaryDto;
import com.tabroadn.bookbrowser.service.SeriesService;

@RestController
@Validated
@RequestMapping("/api")
public class SeriesController {
  private SeriesService seriesService;

  @Autowired
  public SeriesController(SeriesService seriesService) {
    this.seriesService = seriesService;
  }

  @GetMapping("/series/{id}")
  public SeriesDto getById(@PathVariable("id") Long id) {
    return seriesService.getById(id);
  }

  @GetMapping("/series")
  public PageDto<SeriesSummaryDto> findAll(@Valid SeriesSearchCriteriaDto seriesSearchCriteriaDto) {
    return seriesService.findAll(seriesSearchCriteriaDto);
  }

  @Valid
  @PatchMapping("series")
  public SeriesDto save(@Valid @RequestBody SeriesDto seriesDto) {
    return seriesService.save(seriesDto);
  }

  @InitBinder
  public void initBinder(WebDataBinder binder) {
    binder.registerCustomEditor(OrderEnum.class, new CaseInsensitiveEnumEditor(OrderEnum.class));
    binder.registerCustomEditor(LetterEnum.class, new CaseInsensitiveEnumEditor(LetterEnum.class));
  }
}
