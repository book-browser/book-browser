package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.entity.Book;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>, JpaSpecificationExecutor<Book> {
  @Query(
      value =
          "select * from book b "
              + "join creator c on b.id = c.book_id "
              + "join party p on c.party_id = p.id "
              + "where upper(b.title) like upper(concat('%',:query,'%')) "
              + "or upper(b.description) like upper(concat('%',:query,'%')) "
              + "or upper(p.full_name) like upper(concat('%',:query,'%'))",
      nativeQuery = true)
  List<Book> search(String query);
}
