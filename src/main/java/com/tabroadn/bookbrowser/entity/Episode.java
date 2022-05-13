package com.tabroadn.bookbrowser.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Episode {
  @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

  @NotBlank
	@Size(max = 100)
  private String title;

  @Size(max = 2000)
  private String description;

  @ToString.Exclude
  @NotEmpty
	private byte[] thumbnail;

  @NotNull
  private LocalDate releaseDate;

  @ManyToOne
	@JoinColumn(name="series_id")
	@ToString.Exclude
  @NotNull
	private Series series;

  @OneToMany(mappedBy="episode", cascade = CascadeType.ALL, orphanRemoval=true)
  @NotNull
	private List<EpisodeLink> links = new ArrayList<>();
}
