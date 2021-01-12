package com.tabroadn.bookbrowser.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.tabroadn.bookbrowser.domain.RoleEnum;

import lombok.Data;

@Data
@Entity
@IdClass(CreatorId.class)
public class Creator implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Long bookId;
	
	@Id
	private Long personId;
	
	@Enumerated(EnumType.STRING)
	private RoleEnum role;

	@MapsId("bookId")
	@ManyToOne
    @JoinColumn(name = "bookId")
	private Book book;
	
	@MapsId("personId")
	@ManyToOne
	@JoinColumn(name = "personId")
	private Person person;
}
