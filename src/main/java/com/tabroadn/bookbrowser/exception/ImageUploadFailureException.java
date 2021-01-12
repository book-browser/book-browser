package com.tabroadn.bookbrowser.exception;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ImageUploadFailureException extends RuntimeException {
	private static final long serialVersionUID = -3304425430086838709L;
	
	private MultipartFile file;
	
	public ImageUploadFailureException(MultipartFile file, IOException ex) {
		super(ex);
		this.file = file;
	}
}
