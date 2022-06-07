package com.tabroadn.bookbrowser.entity;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Genre {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @ManyToMany(mappedBy = "genres")
  @ToString.Exclude
  private List<Book> books;
}
