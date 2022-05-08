package com.tabroadn.bookbrowser.dto;

import java.util.stream.Stream;

import org.springframework.data.domain.Page;

import lombok.Data;

@Data
public class PageDto<E> {
	private Stream<E> items;
	private int totalPages;
	private long totalElements;
	
	public PageDto(Page<E> page) {
		items = page.get();
		this.totalPages = page.getTotalPages();
		this.totalElements = page.getTotalElements();
	}
}
