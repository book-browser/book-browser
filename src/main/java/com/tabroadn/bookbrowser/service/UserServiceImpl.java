package com.tabroadn.bookbrowser.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.entity.User;
import com.tabroadn.bookbrowser.repository.UserRepository;

@Component
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public void register(User user) {
		userRepository.save(user);
	}
}
