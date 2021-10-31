package com.tabroadn.bookbrowser.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
@Embeddable
@Valid
public class BookLinkId implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column
	private Long bookId;

	@Column
	@NotBlank
	@Size(max = 50)
	private String url;
}
