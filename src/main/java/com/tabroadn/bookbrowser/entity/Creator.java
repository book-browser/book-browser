package com.tabroadn.bookbrowser.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.tabroadn.bookbrowser.domain.CreatorTypeEnum;

import lombok.Data;

@Data
@Entity
public class Creator implements Serializable {
	@Id
	private Long bookId;
	
	@Id
	private Long personId;
	
	@Enumerated(EnumType.STRING)
	private CreatorTypeEnum creatorType;

	@ManyToOne
    @JoinColumn(name = "bookId")
	private Book book;
	
	@ManyToOne
	@JoinColumn(name = "personId")
	private Person person;
}
