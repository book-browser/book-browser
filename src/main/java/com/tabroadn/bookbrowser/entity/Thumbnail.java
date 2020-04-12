package com.tabroadn.bookbrowser.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Thumbnail {
	@Id
	@GeneratedValue
	private Long id;
	
	private String url;
	
	private byte[] data;
}
