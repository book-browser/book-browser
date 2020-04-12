package com.tabroadn.bookbrowser.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import domain.Genre;
import lombok.Data;
import lombok.NonNull;

@Data
@Entity
public class BookGenre {
	@Id
	@GeneratedValue
	private Long id;
	
	@NonNull
	private Long bookId;
	
	@NonNull
	@Enumerated(EnumType.STRING)
	private Genre genre;
}
