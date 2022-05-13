package com.tabroadn.bookbrowser.api;

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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.config.CaseInsensitiveEnumEditor;
import com.tabroadn.bookbrowser.domain.LetterEnum;
import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.dto.SeriesDto;
import com.tabroadn.bookbrowser.service.SeriesService;

@RestController
@Validated
@RequestMapping("/api")
public class SeriesController {
	private SeriesService seriesService;
	
	@Autowired
	public SeriesController(SeriesService seriesService) {
		this.seriesService = seriesService;
	}
	
	@GetMapping("/series/{id}")
	public SeriesDto getById(@PathVariable("id") Long id) {
		return seriesService.getById(id);
	}
	
	@GetMapping(
			value = "/series/{id}/banner",
			produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
	public byte[] getSeriesBanner(@PathVariable("id") Long id, HttpServletResponse response) {
	    response.addHeader("Cache-Control", "max-age=86400, must-revalidate, no-transform");
		return seriesService.getSeriesBanner(id);
	}

	@GetMapping(
			value = "/series/{id}/thumbnail",
			produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
	public byte[] getSeriesThumbnail(@PathVariable("id") Long id, HttpServletResponse response) {
	    response.addHeader("Cache-Control", "max-age=86400, must-revalidate, no-transform");
		return seriesService.getSeriesThumbnail(id);
	}
	
	@GetMapping("/series")
	public PageDto<SeriesDto> findAll(
			@RequestParam(required = false, defaultValue="50") @Min(1) Integer limit,
			@RequestParam(required = false, defaultValue="0") @Min(0) Integer page,
			@RequestParam(required = false, defaultValue="id") String sort,
			@RequestParam(required = false, defaultValue="DESC") OrderEnum order,
			@RequestParam Optional<String> query,
			@RequestParam Optional<String> link,
			@RequestParam(required = false) LetterEnum titleStartsWith) {
		return seriesService.findAll(page, limit, sort, order, query, link, Optional.ofNullable(titleStartsWith));
	}

	@Valid
	@PatchMapping("series")
	public SeriesDto save(@Valid @RequestBody SeriesDto seriesDto) {
		return seriesService.save(seriesDto);
	}
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(OrderEnum.class, new CaseInsensitiveEnumEditor(OrderEnum.class));
		binder.registerCustomEditor(LetterEnum.class, new CaseInsensitiveEnumEditor(LetterEnum.class));
	}
}
