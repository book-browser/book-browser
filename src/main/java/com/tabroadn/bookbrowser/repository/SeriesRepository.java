package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.entity.Series;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SeriesRepository
        extends JpaRepository<Series, Long>, JpaSpecificationExecutor<Series> {

    public Optional<Series> findByUrlTitle(String title);
}
