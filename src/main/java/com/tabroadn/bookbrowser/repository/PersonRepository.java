package com.tabroadn.bookbrowser.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tabroadn.bookbrowser.entity.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
	public List<Person> findByFullNameContainingIgnoreCase(String fullName);
}
