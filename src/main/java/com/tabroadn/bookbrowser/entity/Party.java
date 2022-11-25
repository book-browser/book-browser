package com.tabroadn.bookbrowser.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Formula;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Party {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 150)
  private String fullName;

  @Formula("regexp_replace(regexp_replace(lower(full_name), '[ ]', '-'), '[\\']', '')")
  private String urlName;

  @Size(max = 2000)
  private String description;

  @ToString.Exclude
  private byte[] picture;

  @OneToMany(mappedBy = "party")
  @ToString.Exclude
  private List<BookCreator> creators = new ArrayList<>();

  @OneToMany(mappedBy = "party")
  @ToString.Exclude
  private List<SeriesCreator> seriesCreators = new ArrayList<>();

  @OneToMany(mappedBy = "party")
  @ToString.Exclude
  private List<SeriesPublisher> seriesPublications = new ArrayList<>();
}
