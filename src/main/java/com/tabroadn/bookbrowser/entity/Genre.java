package com.tabroadn.bookbrowser.entity;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.tabroadn.bookbrowser.domain.GenreEnum;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
public class Genre {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @ManyToMany(mappedBy = "genres")
  @ToString.Exclude
  private List<Book> books;

  @ManyToMany(mappedBy = "genres")
  @ToString.Exclude
  private List<Series> series;

  public Genre(Long id) {
    this.id = id;
  }

  public Genre(GenreEnum genreEnum) {
    this.id = genreEnum.getId();
  }
}
