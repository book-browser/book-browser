package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.entity.Series;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class SeriesSpecification {
  private SeriesSpecification() {}

  public static Specification<Series> hasText(String text) {
    String[] parts = text.split(" ");

    return (series, cq, cb) -> {
      cq.distinct(true);
      List<Predicate> predicates = new ArrayList<>();
      for (String part : parts) {
        String pattern = "%" + part.toUpperCase() + "%";
        predicates.add(cb.like(cb.upper(series.get("title")), pattern));
        predicates.add(cb.like(cb.upper(series.get("description")), pattern));
        // predicates.add(cb.like(cb.upper(series.join("creators").join("person").get("fullName")),
        // pattern));
      }

      return cb.or(predicates.toArray(Predicate[]::new));
    };
  }

  public static Specification<Series> orderBy(String field, OrderEnum order) {
    return (series, cq, cb) -> {
      Expression<String> expression = series.get(field);
      if (field.equals("title")) {
        expression =
            cb.function(
                "replace",
                String.class,
                cb.upper(series.get("title")),
                cb.literal("THE "),
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

  public static Specification<Series> titleStartsWith(LetterEnum letterEnum) {
    return (series, cq, cb) -> {
      String pattern = String.format("^%s.*$", letterEnum.getGroup());
      return cb.equal(
          cb.function(
              "regexp_like",
              String.class,
              cb.function(
                  "replace",
                  String.class,
                  cb.upper(series.get("title")),
                  cb.literal("THE "),
                  cb.literal("")),
              cb.literal(pattern)),
          1);
    };
  }

  public static Specification<Series> hasLink(String link) {
    return (series, cq, cb) -> {
      return cb.equal(series.join("links").get("id").get("url"), link);
    };
  }

  public static Specification<Series> hasGenres(List<Genre> genres) {
    return (series, cq, cb) -> {
      cq.distinct(true);
      List<Predicate> predicates = new ArrayList<>();

      for (Genre genre : genres) {
        predicates.add(cb.equal(series.join("genres").get("id"), genre.getId()));
      }

      return cb.and(predicates.toArray(Predicate[]::new));
    };
  }
}
