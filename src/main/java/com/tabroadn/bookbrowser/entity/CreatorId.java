package com.tabroadn.bookbrowser.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class CreatorId implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long bookId;	
	private Long personId;
}
