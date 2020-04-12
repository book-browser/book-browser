package com.tabroadn.bookbrowser.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.repository.BookRepository;

@Component
public class BookService {
	@Autowired
	private BookRepository repository;
	
	public List<Book> getNewBooks() {
		return repository.findAll(PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "uploadDate"))).toList();
	}
	
	public List<Book> getPopularBooks() {
		return repository.findAll(PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "pageViews"))).toList();
	}	
}
