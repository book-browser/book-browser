package com.tabroadn.bookbrowser.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.PartyDto;
import com.tabroadn.bookbrowser.dto.PartySearchCriteriaDto;
import com.tabroadn.bookbrowser.entity.Party;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.PartyRepository;
import com.tabroadn.bookbrowser.repository.PartySpecification;
import com.tabroadn.bookbrowser.util.DtoConversionUtils;

@Component
public class PartyService {
  @Autowired
  private PartyRepository partyRepository;

  public PartyDto getById(Long id) {
    return DtoConversionUtils.convertPartyToPartyDto(getPartyById(id));
  }

  public PartyDto getPublisherById(Long id) {
    return DtoConversionUtils.convertPartyToPartyDto(getPublisherByIdOrElse(id));
  }

  public PartyDto getPublisherByUrlName(String urlName) {
    return DtoConversionUtils.convertPartyToPartyDto(getPublisherByUrlNameOrElse(urlName));
  }

  public PartyDto createOrUpdate(PartyDto partyDto) {
    Party party = convertPartyDtoToParty(partyDto);
    return DtoConversionUtils.convertPartyToPartyDto(partyRepository.save(party));
  }

  public byte[] getPicture(Long id) {
    return getPartyById(id).getPicture();
  }

  public List<PartyDto> search(String query) {
    String[] terms = query.split(" ");
    Set<Party> parties = new HashSet<>();

    for (String term : terms) {
      if (term.length() > 0) {
        parties.addAll(partyRepository.findByFullNameContainingIgnoreCase(term));
      }
    }

    return parties.stream().map(DtoConversionUtils::convertPartyToPartyDto).collect(Collectors.toList());
  }

  public PageDto<PartyDto> findAll(PartySearchCriteriaDto partySearchCriteriaDto) {
    Pageable pageable = PageRequest.of(partySearchCriteriaDto.getPage(), partySearchCriteriaDto.getLimit());

    Specification<Party> specification = PartySpecification.orderBy(
        partySearchCriteriaDto.getSort(), partySearchCriteriaDto.getOrder());

    if (partySearchCriteriaDto.getName() != null) {
      specification = specification.and(
          PartySpecification.fullNameLike(partySearchCriteriaDto.getName().get()));
    }
    return new PageDto<>(
        partyRepository.findAll(specification, pageable).map(DtoConversionUtils::convertPartyToPartyDto));
  }

  public PageDto<PartyDto> findAllPublishers(PartySearchCriteriaDto partySearchCriteriaDto) {
    Pageable pageable = PageRequest.of(partySearchCriteriaDto.getPage(), partySearchCriteriaDto.getLimit());

    Specification<Party> specification = PartySpecification.orderBy(
        partySearchCriteriaDto.getSort(), partySearchCriteriaDto.getOrder());

    if (partySearchCriteriaDto.getName() != null) {
      specification = specification.and(
          PartySpecification.fullNameLike(partySearchCriteriaDto.getName().orElse("")));
    }

    specification = specification.and(PartySpecification.hasPublications());

    return new PageDto<>(
        partyRepository.findAll(specification, pageable).map(DtoConversionUtils::convertPartyToPartyDto));
  }

  private Party convertPartyDtoToParty(PartyDto partyDto) {
    Party party = partyDto.getId() != null ? getPartyById(partyDto.getId()) : new Party();

    if (partyDto.getFullName() != null) {
      party.setFullName(partyDto.getFullName().orElse(null));
    }

    if (partyDto.getDescription() != null) {
      party.setDescription(partyDto.getDescription().orElse(null));
    }

    if (partyDto.getPicture() != null) {
      party.setPicture(partyDto.getPictureBytes());
    }

    return party;
  }

  private Party getPartyById(Long id) {
    return partyRepository
        .findById(id)
        .orElseThrow(
            () -> new ResourceNotFoundException(String.format("party with id %s not found", id)));
  }

  private Party getPublisherByIdOrElse(Long id) {
    return partyRepository
        .findByIdAndSeriesPublicationsIsNotEmpty(id)
        .orElseThrow(
            () -> new ResourceNotFoundException(String.format("publisher with id %s not found", id)));
  }

  private Party getPublisherByUrlNameOrElse(String urlName) {
    return partyRepository
        .findByUrlNameIgnoreCaseAndSeriesPublicationsIsNotEmpty(
            urlName)
        .orElseThrow(
            () -> new ResourceNotFoundException(String.format("publisher with url name %s not found", urlName)));
  }
}
