package com.tabroadn.bookbrowser.repository;

import java.time.Instant;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tabroadn.bookbrowser.entity.VerificationToken;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long>{
	public VerificationToken findByToken(String token);
	
	@Transactional
	@Modifying
	@Query("delete from VerificationToken vt where vt.expirationDate >= :instant")
	public void deleteByExpirationDateAfter(@Param("instant") Instant instant);
}
