package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.entity.Episode;
import javax.persistence.criteria.Expression;
import org.springframework.data.jpa.domain.Specification;

public class EpisodeSpecification {
  private EpisodeSpecification() {
  }

  public static Specification<Episode> orderBy(String field, OrderEnum order) {
    return (episode, cq, cb) -> {
      Expression<String> expression = episode.get(field);
      if (field.equals("title")) {
        expression = cb.function(
            "replace",
            String.class,
            cb.upper(episode.get("title")),
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

  public static Specification<Episode> seriesIdEqual(Long seriesId) {
    return (episode, cq, cb) -> {
      return cb.equal(episode.join("series").get("id"), seriesId);
    };
  }

  public static Specification<Episode> seriesUrlTitleEqual(String urlTitle) {
    return (episode, cq, cb) -> {
      return cb.equal(episode.join("series").get("urlTitle"), urlTitle.toLowerCase());
    };
  }
}
