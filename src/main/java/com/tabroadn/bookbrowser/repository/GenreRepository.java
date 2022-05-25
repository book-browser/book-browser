package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.entity.Genre;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {

  List<Genre> findByNameInIgnoreCase(List<String> names);

  Optional<Genre> findByNameIgnoreCase(String name);
}
