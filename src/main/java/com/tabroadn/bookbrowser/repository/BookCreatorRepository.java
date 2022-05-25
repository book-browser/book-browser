package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.entity.BookCreator;
import com.tabroadn.bookbrowser.entity.BookCreatorId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookCreatorRepository extends JpaRepository<BookCreator, BookCreatorId> {
  public BookCreator findByPartyId(Long partyId);
}
