package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.entity.Party;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyRepository
    extends JpaRepository<Party, Long>, JpaSpecificationExecutor<Party> {
  public List<Party> findByFullNameContainingIgnoreCase(String fullName);

  public Optional<Party> findByIdAndSeriesPublicationsIsNotEmpty(Long id);

  public Optional<Party> findByUrlNameIgnoreCaseAndSeriesPublicationsIsNotEmpty(String urlName);
}
