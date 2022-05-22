package com.tabroadn.bookbrowser.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Valid
public class BookLink {
	@EmbeddedId
	@Valid
	private BookLinkId id = new BookLinkId();

	@NotBlank
	@Size(max = 100)
	private String description;

	@MapsId("bookId")
	@ManyToOne
	@JoinColumn
	@ToString.Exclude
	private Book book;
}
