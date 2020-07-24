package com.tabroadn.bookbrowser.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tabroadn.bookbrowser.entity.Release;

@Repository
public interface ReleaseRepository extends JpaRepository<Release, Long> {

}
