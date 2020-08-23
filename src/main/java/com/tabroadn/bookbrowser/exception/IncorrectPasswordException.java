package com.tabroadn.bookbrowser.exception;

import com.tabroadn.bookbrowser.domain.ErrorCodeEnum;

import lombok.Getter;

public class IncorrectPasswordException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	@Getter
	private ErrorCodeEnum errorCode;
	
	public IncorrectPasswordException(ErrorCodeEnum errorCode, String message) {
		super(message);
		this.errorCode = errorCode;
	}
}
