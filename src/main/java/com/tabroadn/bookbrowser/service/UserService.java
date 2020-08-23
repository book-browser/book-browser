package com.tabroadn.bookbrowser.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.tabroadn.bookbrowser.domain.ErrorCodeEnum;
import com.tabroadn.bookbrowser.dto.UserDto;
import com.tabroadn.bookbrowser.dto.UserSummaryDto;
import com.tabroadn.bookbrowser.entity.User;
import com.tabroadn.bookbrowser.entity.VerificationToken;
import com.tabroadn.bookbrowser.exception.IncorrectPasswordException;
import com.tabroadn.bookbrowser.exception.UserAlreadyExistException;
import com.tabroadn.bookbrowser.exception.UserNotFoundException;
import com.tabroadn.bookbrowser.exception.VerificationTokenExpiredException;
import com.tabroadn.bookbrowser.exception.VerificationTokenNotFoundException;
import com.tabroadn.bookbrowser.repository.UserRepository;
import com.tabroadn.bookbrowser.repository.VerificationTokenRepository;

@Component
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private VerificationTokenRepository verificationTokenRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
 
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${application.url:http://localhost:4200}")
    private String applicationUrl;
    
    @Transactional
	public void register(UserDto userDto) {
		User user = convertUserDtoToUser(userDto);
		user.setRoles(Arrays.asList("ROLE_USER"));
		user.setEnabled(true);
		
		if (emailExists(user.getEmail())) {
			throw new UserAlreadyExistException(String.format(
		              "There is an account with that email adress: %s", 
		              user.getEmail()));
		} else if (userExists(user.getUsername())) {
			throw new UserAlreadyExistException(String.format(
		              "There is an account with that username: %s", 
		              user.getUsername()));
		}
		
		
		User newUser = userRepository.save(user);
		
		VerificationToken verificationToken = createVerificationToken(newUser);
		sendVerificationTokenEmail(verificationToken);
	}
	
    @Transactional
    public void confirmRegistration(String token) {
    	VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
    	
    	if (verificationToken == null) {
    		throw new VerificationTokenNotFoundException(String.format(
    				"This verification token could not be found: %s", token));
    	} else if (verificationToken.isExpired()) {
    		throw new VerificationTokenExpiredException(String.format(
    				"This verification token is expired: %s", token));
    	}
    	
    	User user = verificationToken.getUser();
    	user.setVerified(true);
    	
    	userRepository.save(user);
    	
    	verificationTokenRepository.delete(verificationToken);
    }
    
    public void recreateVerificationToken(String token) {
    	VerificationToken verificationToken = verificationTokenRepository.findByToken(token);

    	if (verificationToken == null) {
    		throw new VerificationTokenNotFoundException(String.format(
    				"This verification token could not be found: %s", token));
    	} else if (verificationToken.isExpired()) {
    		throw new VerificationTokenExpiredException(String.format(
    				"This verification token is expired: %s", token));
    	}
    	
    	User user = verificationToken.getUser();
    	
    	verificationTokenRepository.delete(verificationToken);
    	
    	VerificationToken newVerificationToken = createVerificationToken(user);
		sendVerificationTokenEmail(newVerificationToken);
    }
    
    public List<UserSummaryDto> findUserSummaryByUsernameAndEmail(String username, String email) {
    	return userRepository.findByUsernameAndEmail(username, email)
    			.stream()
    			.map(UserService::convertUserToUserSummaryDto)
    			.collect(Collectors.toList());
	}

	private VerificationToken createVerificationToken(User user) {
    	String token = UUID.randomUUID().toString();
		VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpirationDate(Instant.now().plus(1, ChronoUnit.DAYS));
		
		verificationTokenRepository.save(verificationToken);
		
		return verificationToken;
    }

	private void sendVerificationTokenEmail(VerificationToken verificationToken) {	
        String recipientAddress = verificationToken.getUser().getEmail();
        String subject = "BookBrowser - Account Verification";
        String confirmationUrl = String.format("/user/verify?verification-token=%s", verificationToken.getToken());
        String message = "Please click the following link to activate your account:";
        
        SimpleMailMessage email = new SimpleMailMessage();
        
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(String.format("%s\r\n%s%s", message, applicationUrl, confirmationUrl));
        mailSender.send(email);
	}
	
	private boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }
	
	private boolean userExists(String username) {
		return userRepository.findByUsername(username) != null;
	}
	
	private User convertUserDtoToUser(UserDto userDto) {
		User user = new User();
		user.setUsername(userDto.getUsername());
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		user.setEmail(userDto.getEmail());
		return user;
	}
	
	private static UserSummaryDto convertUserToUserSummaryDto(User user) {
		UserSummaryDto userSummaryDto = new UserSummaryDto();
		userSummaryDto.setUsername(user.getUsername());
		return userSummaryDto;
	}
	
	private static UserDto convertUserToUserDto(User user) {
		UserDto userDto = new UserDto();
		userDto.setUsername(user.getUsername());
		userDto.setVerified(user.isVerified());
		return userDto;
	}

	public UserDto findByUserByUsername(String username) {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UserNotFoundException(
					ErrorCodeEnum.USERNAME_NOT_FOUND,
					String.format("User with username not found: %s", username));
		}
		return convertUserToUserDto(user);
	}
	
	public void verifyUser(String username, String password) {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UserNotFoundException(
					ErrorCodeEnum.USERNAME_NOT_FOUND,
					String.format("User with username not found: %s", username));
		}
		if (!passwordEncoder.matches(password, user.getPassword())) {
			throw new IncorrectPasswordException(
					ErrorCodeEnum.INCORRECT_PASSWORD,
					String.format("Supplied password does not match actual password for user with username: %s", username));
		}
	}
}
