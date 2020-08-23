package com.tabroadn.bookbrowser.dto;

import java.time.Instant;

import org.springframework.http.HttpStatus;

import com.tabroadn.bookbrowser.domain.ErrorCodeEnum;

import lombok.Data;

@Data
public class ApiError {
	private Instant timestamp;
	private int status;
	private String httpError;
	private int code;
	private String apiError;
	private String message;
	private String path;
	
	public ApiError(Instant timestamp, HttpStatus httpStatus, ErrorCodeEnum code, String message, String path) {
		this.timestamp = timestamp;
		this.status = httpStatus.value();
		this.httpError = httpStatus.name();
		this.code = code.getValue();
		this.apiError = code.getName();
		this.message = message;
		this.path = path;
	}
}
