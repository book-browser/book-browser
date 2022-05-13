package com.tabroadn.bookbrowser.api;

import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Min;

import com.tabroadn.bookbrowser.domain.OrderEnum;
import com.tabroadn.bookbrowser.dto.EpisodeDto;
import com.tabroadn.bookbrowser.dto.PageDto;
import com.tabroadn.bookbrowser.service.EpisodeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Validated
@RequestMapping("/api")
@Slf4j
public class EpisodeController {
	private EpisodeService episodeService;

	@Autowired
	public EpisodeController(
			EpisodeService episodeService) {
		this.episodeService = episodeService;
	}

	@Valid
	@PutMapping(value = "/episode")
	public EpisodeDto createOrUpdate(@Valid @RequestBody EpisodeDto episodeDto) {
		return episodeService.createOrUpdate(episodeDto);
	}

	@GetMapping(value = "/episode/{id}")
	public EpisodeDto getById(@PathVariable("id") Long id) {
		return episodeService.getById(id);
	}

	@GetMapping(
			value = "/episode/{id}/thumbnail",
			produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
	public byte[] geEpisodeThumbnail(@PathVariable("id") Long id, HttpServletResponse response) {
	    response.addHeader("Cache-Control", "max-age=86400, must-revalidate, no-transform");
		return episodeService.getEpisodeThumbnail(id);
	}

	@GetMapping("/episodes")
	public PageDto<EpisodeDto> findAll(
			@RequestParam(required = false, defaultValue="50") @Min(1) Integer limit,
			@RequestParam(required = false, defaultValue="0") @Min(0) Integer page,
			@RequestParam(required = false, defaultValue="id") String sort,
			@RequestParam(required = false, defaultValue="DESC") OrderEnum order,
			@RequestParam Optional<Long> seriesId) {
		return episodeService.findAll(page, limit, sort, order, seriesId);
	}
}
