package com.tabroadn.bookbrowser.api;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.entity.User;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@GetMapping("/principal")
	public Principal getPrincipal(Principal principal) {
		return principal;
	}
	
	@PostMapping("/register")
	public void register(@RequestBody User user) {
		
	}
}
