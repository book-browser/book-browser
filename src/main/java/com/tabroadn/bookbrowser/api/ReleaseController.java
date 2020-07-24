package com.tabroadn.bookbrowser.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.dto.ReleaseDto;
import com.tabroadn.bookbrowser.service.ReleaseService;

@RestController
@RequestMapping("/api")
public class ReleaseController {
	@Autowired
	private ReleaseService service;
	
	@GetMapping("/releases")
	public List<ReleaseDto> getNewBooks() {
		return service.getReleases(45);
	}
}
