package com.tabroadn.bookbrowser.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Getter
public enum CreatorTypeEnum {
	AUTHOR("Author"),
	ILLUSTRATOR("Illustrator"),
	COLORIST("Colorist"),
	TRANSLATOR("Translator");
	
	private String title;
	
	private CreatorTypeEnum(String title) {
		this.title = title;
	}
}
