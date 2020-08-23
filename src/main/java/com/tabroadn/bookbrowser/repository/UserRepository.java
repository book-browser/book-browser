package com.tabroadn.bookbrowser.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tabroadn.bookbrowser.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	public User findByEmail(String email);
	public User findByUsername(String username);
	@Query("SELECT u FROM User u WHERE (:username is null or u.username = :username) and (:email is null"
			  + " or u.email = :email)")
	public List<User> findByUsernameAndEmail(String username, String email);
}
