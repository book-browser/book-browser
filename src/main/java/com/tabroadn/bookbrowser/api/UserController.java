package com.tabroadn.bookbrowser.api;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.entity.LoginForm;
import com.tabroadn.bookbrowser.entity.User;

@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
    private AuthenticationManager authenticationManager;
	
	@GetMapping("/principal")
	public Principal getPrincipal(Principal principal) {
		return principal;
	}
	
	@PostMapping("/register")
	public void register(@RequestBody User user) {
		
	}
	
	@PostMapping("/login")
	public Object login(@RequestBody LoginForm loginForm)
	{
		Authentication request = new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword());

        Authentication result = authenticationManager.authenticate(request);
        
        SecurityContextHolder.getContext().setAuthentication(result);
        
        return result.getPrincipal();
	}
}
