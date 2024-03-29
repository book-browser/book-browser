package com.tabroadn.bookbrowser.entity;

import com.tabroadn.bookbrowser.domain.RoleEnum;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class BookCreator implements Serializable {
  private static final long serialVersionUID = 1L;

  @EmbeddedId private BookCreatorId id = new BookCreatorId();

  @Enumerated(EnumType.STRING)
  private RoleEnum role;

  @MapsId("bookId")
  @ManyToOne
  @JoinColumn(name = "book_id")
  @ToString.Exclude
  private Book book;

  @MapsId("partyId")
  @ManyToOne(cascade = CascadeType.PERSIST)
  @JoinColumn
  private Party party;
}
