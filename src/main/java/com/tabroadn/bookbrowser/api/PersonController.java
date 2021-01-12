package com.tabroadn.bookbrowser.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.tabroadn.bookbrowser.dto.PersonDto;
import com.tabroadn.bookbrowser.service.PersonService;

@RestController
@RequestMapping("/api")
public class PersonController {
	@Autowired
	private PersonService service;

	@PostMapping("/persons/search")
	public List<PersonDto> search(@RequestBody JsonNode node) {
		String query = node.get("query").asText();
		return service.search(query);
	}
}
