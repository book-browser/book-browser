package com.tabroadn.bookbrowser.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tabroadn.bookbrowser.entity.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {

}
