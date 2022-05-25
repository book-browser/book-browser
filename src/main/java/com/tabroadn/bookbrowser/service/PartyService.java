package com.tabroadn.bookbrowser.service;

import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.PartyDto;
import com.tabroadn.bookbrowser.dto.PartySearchCriteriaDto;
import com.tabroadn.bookbrowser.entity.Party;
import com.tabroadn.bookbrowser.repository.PartyRepository;
import com.tabroadn.bookbrowser.repository.PartySpecification;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class PartyService {
  @Autowired private PartyRepository partyRepository;

  public List<PartyDto> search(String query) {
    String[] terms = query.split(" ");
    Set<Party> parties = new HashSet<>();

    for (String term : terms) {
      if (term.length() > 0) {
        parties.addAll(partyRepository.findByFullNameContainingIgnoreCase(term));
      }
    }

    return parties.stream().map(PartyService::convertPartyToPartyDto).collect(Collectors.toList());
  }

  public PageDto<PartyDto> findAll(PartySearchCriteriaDto partySearchCriteriaDto) {
    Pageable pageable =
        PageRequest.of(partySearchCriteriaDto.getPage(), partySearchCriteriaDto.getLimit());

    Specification<Party> specification =
        PartySpecification.orderBy(
            partySearchCriteriaDto.getSort(), partySearchCriteriaDto.getOrder());

    if (partySearchCriteriaDto.getName() != null) {
      specification =
          specification.and(
              PartySpecification.fullNameLike(partySearchCriteriaDto.getName().get()));
    }
    return new PageDto<>(
        partyRepository.findAll(specification, pageable).map(PartyService::convertPartyToPartyDto));
  }

  public PageDto<PartyDto> findAllPublishers(PartySearchCriteriaDto partySearchCriteriaDto) {
    Pageable pageable =
        PageRequest.of(partySearchCriteriaDto.getPage(), partySearchCriteriaDto.getLimit());

    Specification<Party> specification =
        PartySpecification.orderBy(
            partySearchCriteriaDto.getSort(), partySearchCriteriaDto.getOrder());

    if (partySearchCriteriaDto.getName() != null) {
      specification =
          specification.and(
              PartySpecification.fullNameLike(partySearchCriteriaDto.getName().orElse("")));
    }

    specification = specification.and(PartySpecification.hasPublications());

    return new PageDto<>(
        partyRepository.findAll(specification, pageable).map(PartyService::convertPartyToPartyDto));
  }

  private static PartyDto convertPartyToPartyDto(Party party) {
    PartyDto partyDto = new PartyDto();
    partyDto.setId(party.getId());
    partyDto.setFullName(party.getFullName());
    return partyDto;
  }
}
