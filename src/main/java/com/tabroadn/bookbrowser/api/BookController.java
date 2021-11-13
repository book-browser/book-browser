package com.tabroadn.bookbrowser.api;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Min;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.config.CaseInsensitiveEnumEditor;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.BookDto;
import com.tabroadn.bookbrowser.dto.BookSummaryDto;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.service.BookService;

@RestController
@Validated
@RequestMapping("/api")
public class BookController {
	@Autowired
	private BookService service;
	
	@GetMapping("/book/{id}")
	public BookDto getById(@PathVariable("id") Long id) {
		return service.getById(id);
	}
	
	@GetMapping("/books")
	public PageDto<BookDto> findAll(
			@RequestParam(required = false, defaultValue="50") @Min(1) Integer limit,
			@RequestParam(required = false, defaultValue="0") @Min(0) Integer page,
			@RequestParam(required = false, defaultValue="id") String sort,
			@RequestParam(required = false, defaultValue="DESC") OrderEnum order,
			@RequestParam Optional<LocalDate> startReleaseDate,
			@RequestParam Optional<LocalDate> endReleaseDate) {
		return service.findAll(page, limit, sort, order,
				startReleaseDate, endReleaseDate);
	}
	
	@GetMapping("/books/search")
	public List<BookSummaryDto> search(
			@RequestParam Optional<String> query,
			@RequestParam Optional<Integer> limit,
			@RequestParam Optional<Integer> page,
			@RequestParam Optional<List<String>> genres) {
		return service.search(page.orElse(0), limit.orElse(50), query, genres);
	}
	
	@GetMapping(
		value = "/book/{id}/thumbnail",
		produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getBookThumbnail(@PathVariable("id") Long id, HttpServletResponse response) {
	    response.addHeader("Cache-Control", "max-age=86400, must-revalidate, no-transform");
		return service.findBookThumbnail(id);
	}
	
	@Valid
	@PutMapping(value = "book")
	public BookDto save(@Valid @RequestBody BookDto bookDto) {
		return service.save(bookDto);
	}
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(OrderEnum.class, new CaseInsensitiveEnumEditor(OrderEnum.class));
	}
}
