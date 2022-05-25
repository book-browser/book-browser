package com.tabroadn.bookbrowser.api;

import com.tabroadn.bookbrowser.dto.BookReleaseDto;
import com.tabroadn.bookbrowser.service.ReleaseService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReleaseController {
  @Autowired private ReleaseService service;

  @GetMapping("/releases")
  public List<BookReleaseDto> getNewBooks() {
    return service.getReleases(45);
  }
}
