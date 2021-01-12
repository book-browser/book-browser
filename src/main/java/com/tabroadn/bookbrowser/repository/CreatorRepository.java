package com.tabroadn.bookbrowser.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tabroadn.bookbrowser.entity.Creator;
import com.tabroadn.bookbrowser.entity.CreatorId;

@Repository
public interface CreatorRepository extends JpaRepository<Creator, CreatorId> {
	public Creator findByPersonId(Long personId);
}
