package com.tabroadn.bookbrowser.entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;

@Data
@Entity
public class Book {
	@Id
	@GeneratedValue
	private Long id;
	
	private String title;
	
	private String description;
	
	@OneToMany(mappedBy="book")
	private List<Creator> creators;
	
	@OneToMany(mappedBy="book")
	private List<Release> releases;
	
	private byte[] thumbnail;
	
	private Integer pageViews;
	
	private LocalDate publishDate;
}
