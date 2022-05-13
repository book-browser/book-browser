package com.tabroadn.bookbrowser.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Series {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 50)
	private String title;

	@NotBlank
	@Size(max = 2000)
	private String description;

	@ToString.Exclude
	private byte[] banner;

	@ToString.Exclude
	private byte[] thumbnail;

	@OneToMany(mappedBy="series", fetch=FetchType.LAZY)
	private List<Book> books = new ArrayList<>();

	@OneToMany(mappedBy="series", fetch=FetchType.LAZY)
	private List<Episode> episodes = new ArrayList<>();

	@OneToMany(mappedBy="series", cascade = CascadeType.ALL, orphanRemoval=true)
	private List<SeriesLink> links = new ArrayList<>();

	@NotEmpty
	@OneToMany(
		mappedBy="series",
		cascade = CascadeType.ALL,
		fetch = FetchType.LAZY,
		orphanRemoval=true)
	private List<SeriesCreator> creators = new ArrayList<>();

	@ManyToMany
	@JoinTable(
		name = "series_genre",
		joinColumns = @JoinColumn(name = "series_id"),
		inverseJoinColumns = @JoinColumn(name = "genre_id"))
	private List<Genre> genres = new ArrayList<>();
}
