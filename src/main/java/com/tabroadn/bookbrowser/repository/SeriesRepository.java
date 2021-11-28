package com.tabroadn.bookbrowser.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tabroadn.bookbrowser.entity.Series;

public interface SeriesRepository extends JpaRepository<Series, Long>, JpaSpecificationExecutor<Series> {
	
}
