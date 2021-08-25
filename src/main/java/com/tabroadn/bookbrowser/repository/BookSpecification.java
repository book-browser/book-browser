package com.tabroadn.bookbrowser.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import com.tabroadn.bookbrowser.entity.Book;
import com.tabroadn.bookbrowser.entity.Genre;

public class BookSpecification {
	 public static Specification<Book> hasText(String text) {
		 String[] parts = text.split(" ");
		 
		 return (book, cq, cb) -> {
			cq.distinct(true);
			List<Predicate> predicates = new ArrayList<>();
			for (String part : parts) {
				 String pattern = "%" + part.toUpperCase() + "%";
				 predicates.add(cb.like(cb.upper(book.get("title")), pattern));
				 predicates.add(cb.like(cb.upper(book.get("description")), pattern));
				 predicates.add(cb.like(cb.upper(book.join("creators").join("person").get("fullName")), pattern));
			}
	
			return cb.or(predicates.toArray(Predicate[]::new));
		 };
	  }
	 
	 public static Specification<Book> hasGenres(List<Genre> genres) {
		 return (book, cq, cb) -> {
			cq.distinct(true);
			List<Predicate> predicates = new ArrayList<>();

			for (Genre genre : genres) {
				 predicates.add(cb.equal(book.join("genres").get("id"), genre.getId()));
			}
	
			return cb.and(predicates.toArray(Predicate[]::new));
		 };
	  }
}
