package com.tabroadn.bookbrowser.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ImageUploadFailureException extends RuntimeException {
	private static final long serialVersionUID = -3304425430086838709L;

	public ImageUploadFailureException(String message, Throwable cause) {
		super(message, cause);
	}
}
