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
import com.tabroadn.bookbrowser.dto.BookInfoDto;
import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.service.BookService;

@RestController
@RequestMapping("/api")
public class BookController {
	@Autowired
	private BookService service;
	
	@GetMapping("/books/popular")
	public List<BookInfoDto> getPopularBooks() {
		return service.getPopularBooks();
	}
	
	@GetMapping("/books/new")
	public List<BookInfoDto> getNewBooks() {
		return service.getNewBooks();
	}
	
	@PostMapping("/books/search")
	public List<BookInfoDto> findByTitleContaining(@RequestBody JsonNode node) {
		String title = node.get("query").asText();
		return service.findByTitleContaining(title);
	}
	
	@GetMapping(
		value = "/book/{id}/thumbnail",
		produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getBookThumbnail(@PathVariable("id") Long id) {
		return service.findById(id).getThumbnail();
	}
}
