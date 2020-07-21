package com.tabroadn.bookbrowser.service;

import java.util.List;

import com.tabroadn.bookbrowser.dto.BookInfoDto;
import com.tabroadn.bookbrowser.entity.Book;

public interface BookService {
	public List<BookInfoDto> getNewBooks();
	public List<BookInfoDto> getPopularBooks();
	public Book findById(Long id);
	public List<BookInfoDto> findByTitleContaining(String title);
}
