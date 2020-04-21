package com.tabroadn.bookbrowser.service;

import java.util.List;

import com.tabroadn.bookbrowser.entity.Book;

public interface BookService {
	public List<Book> getNewBooks();
	public List<Book> getPopularBooks();
	public Book findById(Long id);
	public List<Book> findByTitleContaining(String title);
}
