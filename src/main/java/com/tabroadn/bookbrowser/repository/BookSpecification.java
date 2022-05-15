package com.tabroadn.bookbrowser.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
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
				predicates.add(cb.like(cb.upper(book.join("creators").join("party").get("fullName")), pattern));
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

	public static Specification<Book> releaseDateGreaterThanOrEqual(LocalDate date) {
		return (book, cq, cb) -> {
			return cb.greaterThanOrEqualTo(book.get("releaseDate"), date);
		};
	}

	public static Specification<Book> releaseDateLessThanOrEqual(LocalDate date) {
		return (book, cq, cb) -> {
			return cb.lessThanOrEqualTo(book.get("releaseDate"), date);
		};
	}

	public static Specification<Book> orderBy(String field, OrderEnum order) {
		return (book, cq, cb) -> {
			Expression<String> expression = book.get(field);
			if (field.equals("title")) {
				expression = cb.function("replace", String.class, cb.upper(book.get("title")), cb.literal("THE "),
						cb.literal(""));
			}
			if (order == OrderEnum.ASC) {
				cq.orderBy(cb.asc(expression));
			} else {
				cq.orderBy(cb.desc(expression));
			}
			return null;
		};
	}

	public static Specification<Book> titleStartsWith(LetterEnum letterEnum) {
		return (book, cq, cb) -> {
			String pattern = String.format("^%s.*$", letterEnum.getGroup());
			return cb.equal(cb.function("regexp_like", String.class,
					cb.function("replace", String.class, cb.upper(book.get("title")), cb.literal("THE "), cb.literal("")),
					cb.literal(pattern)), 1);
		};
	}
}
