package com.tabroadn.bookbrowser.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tabroadn.bookbrowser.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
