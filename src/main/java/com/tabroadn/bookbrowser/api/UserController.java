package com.tabroadn.bookbrowser.api;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tabroadn.bookbrowser.dto.LoginForm;
import com.tabroadn.bookbrowser.dto.UserDto;
import com.tabroadn.bookbrowser.dto.UserSummaryDto;
import com.tabroadn.bookbrowser.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
    private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/principal")
	public Principal getPrincipal(Principal principal) {
		return principal;
	}
	
	@PostMapping("/register")
	public void register(@RequestBody UserDto userDto) {
		userService.register(userDto);
	}
	
	@PostMapping("/user/confirm")
	public void confirmRegistration(@RequestBody Map<String, String> payload) {
		String token = payload.get("token");
		userService.confirmRegistration(token);
	}
	
	@PostMapping("/user/verification-token/recreate")
	public void recreateVerificationToken(@RequestBody Map<String, String> payload) {
		String token = payload.get("token");
		userService.recreateVerificationToken(token);
	}
	
	@GetMapping("/user")
	public List<UserSummaryDto> findUserSummaryByUsernameAndEmail(@RequestParam(name="username", required = false) String username, @RequestParam(name="email", required = false) String email) {
		return userService.findUserSummaryByUsernameAndEmail(username, email);
	}
	
	@GetMapping("/user/self")
	public UserDto getCurrentUser(Principal principal) {
		if (principal != null) {
			return userService.findByUserByUsername(principal.getName());
		}
		return null;
	}

	@PostMapping("/login")
	public UserDto login(@RequestBody LoginForm loginForm)
	{
		userService.verifyUser(loginForm.getUsername(), loginForm.getPassword());
		
		Authentication request = new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword());

        Authentication result = authenticationManager.authenticate(request);
        
        SecurityContextHolder.getContext().setAuthentication(result);
        
        return userService.findByUserByUsername(loginForm.getUsername());
	}
}
