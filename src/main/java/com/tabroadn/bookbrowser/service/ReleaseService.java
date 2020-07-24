package com.tabroadn.bookbrowser.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.dto.BookInfoDto;
import com.tabroadn.bookbrowser.dto.ReleaseDto;
import com.tabroadn.bookbrowser.entity.Release;
import com.tabroadn.bookbrowser.repository.ReleaseRepository;

@Component
public class ReleaseService {
	
	@Autowired
	private ReleaseRepository repository;
	
	public List<ReleaseDto> getReleases(int amount) {
		return repository.findAll(PageRequest.of(0, amount, Sort.by(Sort.Direction.DESC, "publishDate")))
				.map(ReleaseService::convertReleaseToReleaseDto)
				.toList();
	}
	
	private static ReleaseDto convertReleaseToReleaseDto(Release release) {
		ReleaseDto releaseDto = new ReleaseDto();
		releaseDto.setId(release.getId());
		releaseDto.setBookId(release.getBook().getId());
		releaseDto.setBookTitle(release.getBook().getTitle());
		releaseDto.setReleaseNumber(release.getReleaseNumber());
		releaseDto.setReleaseType(release.getReleaseType());
		releaseDto.setPublishDate(release.getPublishDate());
		return releaseDto;
	}
}
