package com.tabroadn.bookbrowser.service;

import com.tabroadn.bookbrowser.dto.BookReleaseDto;
import com.tabroadn.bookbrowser.entity.Release;
import com.tabroadn.bookbrowser.repository.ReleaseRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class ReleaseService {

  @Autowired private ReleaseRepository repository;

  public List<BookReleaseDto> getReleases(int amount) {
    return repository
        .findAll(PageRequest.of(0, amount, Sort.by(Sort.Direction.DESC, "publishDate")))
        .map(ReleaseService::convertReleaseToBookReleaseDto)
        .stream()
        .collect(Collectors.toList());
  }

  private static BookReleaseDto convertReleaseToBookReleaseDto(Release release) {
    BookReleaseDto bookReleaseDto = new BookReleaseDto();
    bookReleaseDto.setId(release.getId());
    bookReleaseDto.setBookId(release.getBook().getId());
    bookReleaseDto.setBookTitle(release.getBook().getTitle());
    bookReleaseDto.setReleaseNumber(release.getReleaseNumber());
    bookReleaseDto.setReleaseType(release.getReleaseType());
    bookReleaseDto.setPublishDate(release.getPublishDate());
    return bookReleaseDto;
  }
}
