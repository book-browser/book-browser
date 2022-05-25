package com.tabroadn.bookbrowser.repository;

import com.tabroadn.bookbrowser.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  public Optional<User> findByEmail(String email);

  public Optional<User> findByUsername(String username);

  @Query(
      "SELECT u FROM User u WHERE (:username is null or u.username = :username) and (:email is null"
          + " or u.email = :email)")
  public List<User> findByUsernameAndEmail(String username, String email);

  public boolean existsUserByUsername(String username);

  public boolean existsUserByEmail(String email);
}
