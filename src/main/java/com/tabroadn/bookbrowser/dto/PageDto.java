package com.tabroadn.bookbrowser.dto;

import java.util.stream.Stream;
import lombok.Data;
import org.springframework.data.domain.Page;

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
