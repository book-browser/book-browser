package com.tabroadn.bookbrowser.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Person {
	@Id
	@GeneratedValue
	private Long id;
	
	private String firstName;
	
	private String middleName;
	
	private String lastName;
}
