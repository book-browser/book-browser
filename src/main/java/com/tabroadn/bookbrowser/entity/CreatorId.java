package com.tabroadn.bookbrowser.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class CreatorId implements Serializable {
	private static final long serialVersionUID = 1L;
	@Column
	private Long bookId;
	@Column
	private Long personId;
}
