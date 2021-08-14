package com.tabroadn.bookbrowser.api;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
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
	private PersistentTokenBasedRememberMeServices persistentTokenBasedRememberMeServices;

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

	@PostMapping("/verify/email")
	public void resendVerificationEmail(@RequestBody Map<String, String> payload) {
		String email = payload.get("email");
		userService.resendVerificationEmail(email);
	}
	
	@PostMapping("/username/email")
	public void sendUsernameEmail(@RequestBody Map<String, String> payload) {
		String email = payload.get("email");
		userService.sendUsernameEmail(email);
	}

	@GetMapping("/user")
	public List<UserSummaryDto> findUserSummaryByUsernameAndEmail(
			@RequestParam(name = "username", required = false) String username,
			@RequestParam(name = "email", required = false) String email) {
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
	public UserDto login(HttpServletRequest request, HttpServletResponse response, @RequestBody LoginForm loginForm) {
		try {
			UserDto userDto = userService.verifyUser(loginForm.getUsername(), loginForm.getPassword());

			Authentication authenticationRequest = new UsernamePasswordAuthenticationToken(loginForm.getUsername(),
					loginForm.getPassword());

			Authentication result = authenticationManager.authenticate(authenticationRequest);

			SecurityContextHolder.getContext().setAuthentication(result);

			persistentTokenBasedRememberMeServices.loginSuccess(request, response, result);

			return userDto;
		} catch (Exception e) {
			persistentTokenBasedRememberMeServices.loginFail(request, response);
			throw e;
		}
	}
}
