package com.tabroadn.bookbrowser.exception;

public class UserAlreadyExistException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public UserAlreadyExistException(String message) {
		super(message);
	}
}
