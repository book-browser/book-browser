package com.tabroadn.bookbrowser.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.service.BookService;

@RestController
@RequestMapping("/api")
public class BookController {
	@Autowired
	private BookService service;
	
	@GetMapping("/book/{id}")
	public BookDto findById(@PathVariable("id") Long id) {
		return service.findById(id);
	}
	
	@PostMapping("/books/search")
	public List<BookSummaryDto> findByTitleContaining(@RequestBody JsonNode node) {
		String title = node.get("query").asText();
		return service.findByTitleContaining(title);
	}
	
	@GetMapping(
		value = "/book/{id}/thumbnail",
		produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getBookThumbnail(@PathVariable("id") Long id) {
		return service.findBookThumbnail(id);
	}
}
