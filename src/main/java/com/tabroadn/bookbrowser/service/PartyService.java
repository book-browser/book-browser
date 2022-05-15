package com.tabroadn.bookbrowser.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.dto.PartyDto;
import com.tabroadn.bookbrowser.entity.Party;
import com.tabroadn.bookbrowser.repository.PartyRepository;

@Component
public class PartyService {
	@Autowired
	private PartyRepository partyRepository;

	public List<PartyDto> search(String query) {
		String[] terms = query.split(" ");
		Set<Party> parties = new HashSet<>();

		for (String term : terms) {
			if (term.length() > 0) {
				parties.addAll(partyRepository.findByFullNameContainingIgnoreCase(term));
			}
		}

		return parties.stream()
				.map(PartyService::convertPartyToPartyDto)
				.collect(Collectors.toList());
	}

	private static PartyDto convertPartyToPartyDto(Party party) {
		PartyDto partyDto = new PartyDto();
		partyDto.setId(party.getId());
		partyDto.setFullName(party.getFullName());
		return partyDto;
	}
}
