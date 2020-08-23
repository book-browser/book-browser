package com.tabroadn.bookbrowser.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class Authority implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private Long userId;
	
	@Id
	private String role;

	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;
}
