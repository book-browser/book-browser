package com.tabroadn.bookbrowser.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.service.BookService;

@RestController
@RequestMapping("/api")
public class BookController {
	@Autowired
	private BookService service;
	
	@GetMapping("/books/popular")
	public List<Book> getPopularBooks() {
		return service.getPopularBooks();
	}
	
	@GetMapping("/books/new")
	public List<Book> getNewBooks() {
		return service.getNewBooks();
	}
}
