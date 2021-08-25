package com.tabroadn.bookbrowser.api;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookForm;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.service.BookService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Validated
@RequestMapping("/api")
@Slf4j
public class BookController {
	@Autowired
	private BookService service;
	
	@GetMapping("/book/{id}")
	public BookDto getById(@PathVariable("id") Long id) {
		return service.getById(id);
	}
	
	@GetMapping("/book/search")
	public List<BookSummaryDto> search(
			@RequestParam Optional<String> query,
			@RequestParam Optional<Integer> limit,
			@RequestParam Optional<Integer> page,
			@RequestParam Optional<List<String>> genres) {
		return service.search(page.orElse(0), limit.orElse(50), query, genres);
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
