package com.tabroadn.bookbrowser.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
public class Status implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @OneToMany(mappedBy = "status")
  @ToString.Exclude
  private List<Series> series;

  @OneToMany(mappedBy = "status")
  @ToString.Exclude
  private List<SeriesPublisher> publishers;

  public Status(Long id) {
    this.id = id;
  }
}
