package com.tabroadn.bookbrowser.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Series {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 50)
	private String title;

	@NotBlank
	@Size(max = 2000)
	private String description;

	@NotEmpty
	@ToString.Exclude
	private byte[] banner;

	@OneToMany(mappedBy="series", fetch=FetchType.LAZY)
	private List<Book> books = new ArrayList<>();
}
