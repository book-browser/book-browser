package com.tabroadn.bookbrowser.dto;

import java.time.Instant;
import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ApiError {
	private Instant timestamp;
	private int status;
	private String httpError;
	private String message;
	private List<String> errors;
	private String path;
	private String correlationId;
	
	public ApiError(Instant timestamp, HttpStatus httpStatus, String message, List<String> errors, String path) {
		this.timestamp = timestamp;
		this.status = httpStatus.value();
		this.httpError = httpStatus.name();
		this.errors = errors;
		this.message = message;
		this.path = path;
	}
}
