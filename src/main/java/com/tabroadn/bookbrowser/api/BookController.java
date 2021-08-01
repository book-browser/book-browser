package com.tabroadn.bookbrowser.api;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookForm;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.service.BookService;

@RestController
@Validated
@RequestMapping("/api")
public class BookController {
	@Autowired
	private BookService service;
	
	@GetMapping("/book/{id}")
	public BookDto getById(@PathVariable("id") Long id) {
		return service.getById(id);
	}
	
	@PostMapping("/books/search")
	public List<BookSummaryDto> search(@RequestBody JsonNode node, @RequestParam Optional<Integer> limit) {
		String query = node.get("query").asText();
		return service.search(query, limit.orElse(50));
	}
	
	@GetMapping(
		value = "/book/{id}/thumbnail",
		produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getBookThumbnail(@PathVariable("id") Long id) {
		return service.findBookThumbnail(id);
	}
	
	@Valid
	@PutMapping(
		value = "book",
		consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public BookDto save(@Valid BookForm bookForm) {
		return service.save(bookForm);
	}
}
