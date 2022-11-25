package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.entity.Party;
import com.tabroadn.bookbrowser.entity.SeriesCreator;
import com.tabroadn.bookbrowser.entity.SeriesPublisher;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.Specification;

public class PartySpecification {
  public static Specification<Party> orderBy(String field, OrderEnum order) {
    return (party, cq, cb) -> {
      Expression<String> expression = party.get(field);
      if (order == OrderEnum.ASC) {
        cq.orderBy(cb.asc(expression));
      } else {
        cq.orderBy(cb.desc(expression));
      }
      return null;
    };
  }

  public static Specification<Party> fullNameLike(String fullName) {
    return (party, cq, cb) -> {
      String pattern = "%" + fullName.toUpperCase() + "%";
      return cb.like(cb.upper(party.get("fullName")), pattern);
    };
  }

  public static Specification<Party> hasPublications() {
    return (party, cq, cb) -> {
      Subquery<Long> sq = cq.subquery(Long.class);
      Root<SeriesPublisher> subRoot = sq.from(SeriesPublisher.class);

      return cb.greaterThan(
          sq.select(cb.count(subRoot))
              .where(cb.equal(party.get("id"), subRoot.get("party").get("id"))),
          0L);
    };
  }

  public static Specification<Party> isCreator() {
    return (party, cq, cb) -> {
      Subquery<Long> sq = cq.subquery(Long.class);
      Root<SeriesCreator> subRoot = sq.from(SeriesCreator.class);

      return cb.greaterThan(
          sq.select(cb.count(subRoot))
              .where(cb.equal(party.get("id"), subRoot.get("party").get("id"))),
          0L);
    };
  }
}
