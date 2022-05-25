package com.tabroadn.bookbrowser.api;

import com.tabroadn.bookbrowser.dto.ReferenceData;
import com.tabroadn.bookbrowser.service.ReferenceDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReferenceDataController {
  @Autowired private ReferenceDataService referenceDataService;

  @GetMapping("/reference-data")
  public ReferenceData getReferenceData() {
    return referenceDataService.getReferenceData();
  }
}
