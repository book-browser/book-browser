package com.tabroadn.bookbrowser.entity;

import java.sql.Date;

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
	
	private String thumbnailUrl;
	
	private int pageViews;
	
	private Date uploadDate;
}
