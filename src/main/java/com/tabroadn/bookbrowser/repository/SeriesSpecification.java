package com.tabroadn.bookbrowser.repository;

import javax.persistence.criteria.Expression;

import org.springframework.data.jpa.domain.Specification;

import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.entity.Series;

public class SeriesSpecification {
	public static Specification<Series> orderBy(String field, OrderEnum order) {
		 return (series, cq, cb) -> {
			 Expression<String> expression = series.get(field);
			 if (field.equals("title")) {
				 expression = cb.function("replace", String.class, cb.upper(series.get("title")), cb.literal("THE "), cb.literal(""));
			 }
			 if (order == OrderEnum.ASC) {
				 cq.orderBy(cb.asc(expression));
			 } else {
				 cq.orderBy(cb.desc(expression));
			 }
			 return null;
		 };
	  }
	 
	 public static Specification<Series> titleStartsWith(LetterEnum letterEnum) {
		 return (series, cq, cb) -> {	
			 String pattern = String.format("^%s.*$", letterEnum.getGroup());
			 return cb.equal(cb.function("regexp_like", String.class, cb.function("replace", String.class, cb.upper(series.get("title")), cb.literal("THE "), cb.literal("")), cb.literal(pattern)), 1);
		 };
	  }
}
