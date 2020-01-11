package com.tabroadn.bookbrowser.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
@Entity
public class User {
	
	@Id
	@GeneratedValue
	private Long id;
	@NotNull
	@NotEmpty
	private String password;
	@NotNull
	@NotEmpty
	private String email;
}
