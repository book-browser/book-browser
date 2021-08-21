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

@Data
@Entity
public class Book {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(max = 50)
	private String title;
	
	@NotBlank
	@Size(max = 2000)
	private String description;

	@NotEmpty
	private byte[] thumbnail;
	
	private Integer pageViews;
	
//	private Instant releaseDate;
	
	@NotEmpty
	@OneToMany(
		mappedBy="book",
		cascade = {CascadeType.PERSIST, CascadeType.MERGE},
		fetch = FetchType.LAZY)
	private List<Creator> creators = new ArrayList<>();
	
	@OneToMany(mappedBy="book", cascade = CascadeType.MERGE)
	private List<Release> releases = new ArrayList<>();
	
	@OneToMany(mappedBy="book", cascade = CascadeType.ALL)
	private List<BookLink> links = new ArrayList<>();
	
	@ManyToMany(cascade={CascadeType.PERSIST, CascadeType.DETACH})
	@JoinTable(
		name = "book_genre",
		joinColumns = @JoinColumn(name = "book_id"),
		inverseJoinColumns = @JoinColumn(name = "genre_id"))
	private List<Genre> genres;
}
