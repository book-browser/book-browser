package com.tabroadn.bookbrowser.api;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.tabroadn.bookbrowser.dto.PartyDto;
import com.tabroadn.bookbrowser.service.PartyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PartyController {
	@Autowired
	private PartyService partyService;

	@PostMapping("/party/search")
	public List<PartyDto> search(@RequestBody JsonNode node) {
		String query = node.get("query").asText();
		return partyService.search(query);
	}
}
