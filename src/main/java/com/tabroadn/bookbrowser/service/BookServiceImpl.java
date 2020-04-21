package com.tabroadn.bookbrowser.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.repository.BookRepository;

@Profile("!mock")
@Component
public class BookServiceImpl implements BookService {
	@Autowired
	private BookRepository repository;
	
	@Override
	public List<Book> getNewBooks() {
		return repository.findAll(PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "uploadDate"))).toList();
	}
	
	@Override
	public List<Book> getPopularBooks() {
		return repository.findAll(PageRequest.of(0, 20, Sort.by(Sort.Direction.DESC, "pageViews"))).toList();
	}

	@Override
	public Book findById(Long id) {
		return repository.findById(id).get();
	}	
	
	@Override
	public List<Book> findByTitleContaining(String title) {
		return repository.findByTitleContainingIgnoreCase(title);
	}
}
