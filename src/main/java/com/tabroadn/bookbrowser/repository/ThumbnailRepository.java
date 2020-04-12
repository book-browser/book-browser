package com.tabroadn.bookbrowser.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tabroadn.bookbrowser.entity.Thumbnail;

public interface ThumbnailRepository extends JpaRepository<Thumbnail, Long>{

}
