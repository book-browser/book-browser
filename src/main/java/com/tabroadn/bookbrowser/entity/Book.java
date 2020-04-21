package com.tabroadn.bookbrowser.entity;

import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Book {
	@Id
	@GeneratedValue
	private Long id;
	
	private String title;
	
	private String description;
	
//	private List<String> authors;
	
	private byte[] thumbnail;
	
	private int pageViews;
	
	private Date uploadDate;
}
