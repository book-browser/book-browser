package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.entity.Episode;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface EpisodeRepository
        extends JpaRepository<Episode, Long>, JpaSpecificationExecutor<Episode> {
    public List<Episode> findAllBySeriesIdOrderByReleaseDateDesc(Long seriesId);
}
