package com.tabroadn.bookbrowser.entity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	@OneToMany(mappedBy="book", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
	private List<Creator> creators = new ArrayList<>();
	
	@OneToMany(mappedBy="book", cascade = CascadeType.MERGE)
	private List<Release> releases = new ArrayList<>();
	
	@NotEmpty
	private byte[] thumbnail;
	
	private Integer pageViews;
	
	private Instant releaseDate;
	
}
