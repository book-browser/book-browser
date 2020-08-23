package com.tabroadn.bookbrowser.exception;

public class VerificationTokenNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public VerificationTokenNotFoundException(String message) {
		super(message);
	}
}
