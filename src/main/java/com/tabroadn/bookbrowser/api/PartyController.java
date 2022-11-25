package com.tabroadn.bookbrowser.api;

import com.tabroadn.bookbrowser.config.CaseInsensitiveEnumEditor;
import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.PartyDto;
import com.tabroadn.bookbrowser.dto.PartySearchCriteriaDto;
import com.tabroadn.bookbrowser.service.PartyService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PartyController {
  @Autowired
  private PartyService partyService;

  @GetMapping("/parties/{id}")
  public PartyDto getById(@PathVariable("id") Long id) {
    return partyService.getById(id);
  }

  @GetMapping("/publishers/{idOrUrlName}")
  public PartyDto getPublisherById(@PathVariable("idOrUrlName") String idOrUrlName) {
    if (NumberUtils.isCreatable(idOrUrlName)) {
      return partyService.getPublisherById(Long.parseLong(idOrUrlName));
    }
    return partyService.getPublisherByUrlName(idOrUrlName);
  }

  @GetMapping("/creators/{idOrUrlName}")
  public PartyDto getCreatorById(@PathVariable("idOrUrlName") String idOrUrlName) {
    if (NumberUtils.isCreatable(idOrUrlName)) {
      return partyService.getCreatorById(Long.parseLong(idOrUrlName));
    }
    return partyService.getCreatorByUrlName(idOrUrlName);
  }

  @GetMapping(value = "/party/{id}/picture", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
  public byte[] getSeriesBanner(@PathVariable("id") Long id, HttpServletResponse response) {
    response.addHeader("Cache-Control", "max-age=86400, must-revalidate, no-transform");
    return partyService.getPicture(id);
  }

  @Valid
  @PatchMapping("/parties")
  public PartyDto createOrUpdate(@Valid @RequestBody PartyDto partyDto) {
    return partyService.createOrUpdate(partyDto);
  }

  @GetMapping("/parties")
  public PageDto<PartyDto> search(@Valid PartySearchCriteriaDto partySearchCriteriaDto) {
    return partyService.findAll(partySearchCriteriaDto);
  }

  @GetMapping("/publishers")
  public PageDto<PartyDto> getPublishers(
      @Valid PartySearchCriteriaDto partySearchCriteriaDto) {
    return partyService.findAllPublishers(partySearchCriteriaDto);
  }

  @GetMapping("/creators")
  public PageDto<PartyDto> getCreators(
      @Valid PartySearchCriteriaDto partySearchCriteriaDto) {
    return partyService.findAllCreators(partySearchCriteriaDto);
  }

  @InitBinder
  public void initBinder(WebDataBinder binder) {
    binder.registerCustomEditor(OrderEnum.class, new CaseInsensitiveEnumEditor(OrderEnum.class));
    binder.registerCustomEditor(LetterEnum.class, new CaseInsensitiveEnumEditor(LetterEnum.class));
  }
}
