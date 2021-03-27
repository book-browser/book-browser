package com.tabroadn.bookbrowser.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.tabroadn.bookbrowser.domain.ReleaseTypeEnum;

import lombok.Data;

@Data
@Entity(name="book_release")
public class Release {
	@Id
	@GeneratedValue
	private Long id;
	
	@ManyToOne
    @JoinColumn(name = "book_id")
	private Book book;
	
	private String description;
	
	@Enumerated(EnumType.STRING)
	private ReleaseTypeEnum releaseType;
	
	private Integer releaseNumber;
	
	private LocalDate publishDate;
}
