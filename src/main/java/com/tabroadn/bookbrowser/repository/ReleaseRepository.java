package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.entity.Release;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReleaseRepository extends JpaRepository<Release, Long> {}
