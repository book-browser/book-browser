package com.tabroadn.bookbrowser.api;

import com.tabroadn.bookbrowser.config.CaseInsensitiveEnumEditor;
import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.PartyDto;
import com.tabroadn.bookbrowser.dto.PartySearchCriteriaDto;
import com.tabroadn.bookbrowser.service.PartyService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PartyController {
  @Autowired private PartyService partyService;

  @GetMapping("/parties")
  public PageDto<PartyDto> search(@Valid PartySearchCriteriaDto partySearchCriteriaDto) {
    return partyService.findAll(partySearchCriteriaDto);
  }

  @GetMapping("/parties/publisher")
  public PageDto<PartyDto> getPublisherParties(
      @Valid PartySearchCriteriaDto partySearchCriteriaDto) {
    return partyService.findAllPublishers(partySearchCriteriaDto);
  }

  @InitBinder
  public void initBinder(WebDataBinder binder) {
    binder.registerCustomEditor(OrderEnum.class, new CaseInsensitiveEnumEditor(OrderEnum.class));
    binder.registerCustomEditor(LetterEnum.class, new CaseInsensitiveEnumEditor(LetterEnum.class));
  }
}
