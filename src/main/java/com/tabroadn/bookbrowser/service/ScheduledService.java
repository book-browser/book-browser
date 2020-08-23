package com.tabroadn.bookbrowser.service;

import java.time.Instant;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.repository.VerificationTokenRepository;

@Component
public class ScheduledService {
    private static Logger logger = LogManager.getLogger(ScheduledService.class);

	@Autowired
	private VerificationTokenRepository verificationTokenRepository;
	
	@Scheduled(fixedDelay = 1000 * 60 * 60 * 24)
	public void deleteExpiredVerificationTokens() {
		logger.info("Deleting expired verification tokens...");
		verificationTokenRepository.deleteByExpirationDateAfter(Instant.now());	
	}
}
	