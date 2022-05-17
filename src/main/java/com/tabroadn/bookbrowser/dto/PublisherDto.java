package com.tabroadn.bookbrowser.dto;

import java.util.Optional;

import lombok.Data;

@Data
public class PublisherDto {
  private Optional<Long> partyId;

  private Optional<String> fullName;

  private Optional<String> url;
}
