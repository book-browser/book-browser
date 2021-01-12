package com.tabroadn.bookbrowser.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.dto.PersonDto;
import com.tabroadn.bookbrowser.entity.Person;
import com.tabroadn.bookbrowser.repository.PersonRepository;

@Component
public class PersonService {
	@Autowired
	private PersonRepository personRepository;
	
	public List<PersonDto> search(String query) {
		String[] terms = query.split(" ");	
		Set<Person> persons = new HashSet<>();
		
		for (String term : terms) {
			if(term.length() > 0) {
				persons.addAll(personRepository.findByFullNameContainingIgnoreCase(term));
			}
		}
		
		return persons.stream()
				.map(PersonService::convertPersonToPersonDto)
				.collect(Collectors.toList());
	}
	
	private static PersonDto convertPersonToPersonDto(Person person) {
		PersonDto personDto = new PersonDto();
		personDto.setId(person.getId());
		personDto.setFullName(person.getFullName());
		return personDto;
	}
}
