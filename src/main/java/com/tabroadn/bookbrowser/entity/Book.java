package com.tabroadn.bookbrowser.entity;

import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import lombok.Data;

@Data
@Entity
public class Book {
	@Id
	@GeneratedValue
	private Long id;
	
	private String title;
	
	private String description;
	
	@ManyToMany
	@JoinTable(
	  name = "author", 
	  joinColumns = @JoinColumn(name = "book_id"), 
	  inverseJoinColumns = @JoinColumn(name = "person_id"))
	private List<Person> authors;
	
	private byte[] thumbnail;
	
	private Integer pageViews;
	
	private Date uploadDate;
}
