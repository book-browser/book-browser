package com.tabroadn.bookbrowser.config;

import com.tabroadn.bookbrowser.entity.Genre;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.repository.GenreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;

@Configuration
public class StringToGenreConverter implements Converter<String, Genre> {
  @Autowired
  private GenreRepository genreRepository;

  @Override
  public Genre convert(String source) {
    return genreRepository.findByNameIgnoreCase(source)
        .orElseThrow(() -> new ResourceNotFoundException(String.format("genre with name %s not found", source)));
  }
}
