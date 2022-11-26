package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.domain.StatusEnum;
import com.tabroadn.bookbrowser.domain.GenreEnum;
import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.entity.Series;
import com.tabroadn.bookbrowser.entity.SeriesCreator;
import com.tabroadn.bookbrowser.entity.SeriesPublisher;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import org.springframework.data.jpa.domain.Specification;

public class SeriesSpecification {
  private SeriesSpecification() {
  }

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
        expression = cb.function(
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

  public static Specification<Series> hasPublisherUrlName(String urlName) {
    return (series, cq, cb) -> {
      return cb.equal(series.join("publishers").join("party").get("urlName"), urlName.toLowerCase());
    };
  }

  public static Specification<Series> hasPublisherId(Long id) {
    return (series, cq, cb) -> {
      return cb.equal(series.join("publishers").get("id").get("partyId"), id);
    };
  }

  public static Specification<Series> hasNoPublisher() {
    return (series, cq, cb) -> {
      Subquery<Long> sq = cq.subquery(Long.class);
      Root<SeriesPublisher> subRoot = sq.from(SeriesPublisher.class);

      return cb.equal(
          sq.select(cb.count(subRoot))
              .where(cb.notEqual(series.get("id"), subRoot.get("series").get("id"))),
          0L);
    };
  }

  public static Specification<Series> hasCreatorUrlName(String urlName) {
    return (series, cq, cb) -> {
      return cb.equal(series.join("creators").join("party").get("urlName"), urlName.toLowerCase());
    };
  }

  public static Specification<Series> hasCreatorId(Long id) {
    return (series, cq, cb) -> {
      return cb.equal(series.join("creators").get("id").get("partyId"), id);
    };
  }

  public static Specification<Series> hasNoCreator() {
    return (series, cq, cb) -> {
      Subquery<Long> sq = cq.subquery(Long.class);
      Root<SeriesCreator> subRoot = sq.from(SeriesCreator.class);

      return cb.equal(
          sq.select(cb.count(subRoot))
              .where(cb.notEqual(series.get("id"), subRoot.get("series").get("id"))),
          0L);
    };
  }

  public static Specification<Series> hasLink(String link) {
    return (series, cq, cb) -> {
      return cb.equal(series.join("links").get("id").get("url"), link);
    };
  }

  public static Specification<Series> hasStatus(StatusEnum status) {
    return (series, cq, cb) -> {
      return cb.equal(series.get("status").get("id"), status.getId());
    };
  }

  public static Specification<Series> startDateAfter(LocalDate date) {
    return (series, cq, cb) -> {
      return cb.greaterThanOrEqualTo(series.get("startDate"), date);
    };
  }

  public static Specification<Series> lastUpdatedBefore(LocalDate date) {
    return (series, cq, cb) -> {
      return cb.lessThanOrEqualTo(series.get("lastUpdated"), date);
    };
  }

  public static Specification<Series> hasGenres(List<GenreEnum> genres) {
    return (series, cq, cb) -> {
      cq.distinct(true);
      Subquery<Long> sq = cq.subquery(Long.class);
      Root<Genre> subRoot = sq.from(Genre.class);

      List<Predicate> predicates = new ArrayList<>();

      for (GenreEnum genre : genres) {
        if (genre == null) {
          predicates.add(cb.equal(sq.select(cb.count(subRoot)).where(
              cb.equal(series.get("id"), subRoot.join("series").get("id"))), 0));
        } else {
          predicates.add(cb.equal(series.join("genres").get("id"), genre.getId()));
        }
      }

      return cb.and(predicates.toArray(Predicate[]::new));
    };
  }
}
