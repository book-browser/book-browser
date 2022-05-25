package com.tabroadn.bookbrowser.service;

import com.tabroadn.bookbrowser.domain.ErrorCodeEnum;
import com.tabroadn.bookbrowser.dto.UserDto;
import com.tabroadn.bookbrowser.dto.UserSummaryDto;
import com.tabroadn.bookbrowser.entity.User;
import com.tabroadn.bookbrowser.entity.VerificationToken;
import com.tabroadn.bookbrowser.exception.IncorrectPasswordException;
import com.tabroadn.bookbrowser.exception.ResourceNotFoundException;
import com.tabroadn.bookbrowser.exception.UserAlreadyExistException;
import com.tabroadn.bookbrowser.exception.VerificationTokenExpiredException;
import com.tabroadn.bookbrowser.repository.UserRepository;
import com.tabroadn.bookbrowser.repository.VerificationTokenRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class UserService implements UserDetailsService {
  @Autowired private UserRepository userRepository;

  @Autowired private VerificationTokenRepository verificationTokenRepository;

  @Autowired private PasswordEncoder passwordEncoder;

  @Autowired private JavaMailSender mailSender;

  @Transactional
  public void register(UserDto userDto) {
    User user = convertUserDtoToUser(userDto);
    user.setRoles(Arrays.asList("ROLE_USER"));
    user.setEnabled(true);

    if (userRepository.existsUserByEmail(user.getEmail())) {
      throw new UserAlreadyExistException(
          String.format("There is an account with that email address: %s", user.getEmail()));
    } else if (userRepository.existsUserByUsername(user.getUsername())) {
      throw new UserAlreadyExistException(
          String.format("There is an account with that username: %s", user.getUsername()));
    }

    User newUser = userRepository.save(user);

    VerificationToken verificationToken = createVerificationToken(newUser);
    sendVerificationTokenEmail(verificationToken);
  }

  @Transactional
  public void confirmRegistration(String token) {
    VerificationToken verificationToken = verificationTokenRepository.findByToken(token);

    if (verificationToken == null) {
      throw new ResourceNotFoundException(
          String.format("The verification token could not be found: %s", token));
    } else if (verificationToken.isExpired()) {
      throw new VerificationTokenExpiredException(
          String.format("The verification token is expired: %s", token));
    }

    User user = verificationToken.getUser();
    user.setVerified(true);

    userRepository.save(user);

    verificationTokenRepository.delete(verificationToken);
  }

  public void resendVerificationEmail(String email) {
    VerificationToken verificationToken = verificationTokenRepository.findByUserEmail(email);

    if (verificationToken == null) {
      throw new ResourceNotFoundException(
          String.format("This verification token for the email %s could not be found", email));
    } else if (verificationToken.isExpired()) {
      throw new VerificationTokenExpiredException(
          String.format("This verification token for the email %s is expired", email));
    }

    User user = verificationToken.getUser();

    verificationTokenRepository.delete(verificationToken);

    VerificationToken newVerificationToken = createVerificationToken(user);
    sendVerificationTokenEmail(newVerificationToken);
  }

  public void sendUsernameEmail(String email) {
    Optional<User> optionalUser = userRepository.findByEmail(email);

    User user =
        optionalUser.orElseThrow(
            () ->
                new ResourceNotFoundException(
                    String.format("User with email %s could not be found", email)));

    String subject = "BookBrowser - Forgot Username";
    String message =
        "A request has been made for the username of this email. Your username is \"%s\".";

    SimpleMailMessage mailMessage = new SimpleMailMessage();

    mailMessage.setTo(user.getEmail());
    mailMessage.setSubject(subject);
    mailMessage.setText(String.format(message, user.getUsername()));
    mailSender.send(mailMessage);
  }

  public List<UserSummaryDto> findUserSummaryByUsernameAndEmail(String username, String email) {
    return userRepository.findByUsernameAndEmail(username, email).stream()
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
    String applicationUrl =
        ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
    String recipientAddress = verificationToken.getUser().getEmail();
    String subject = "BookBrowser - Account Verification";
    String confirmationUrl = String.format("/user/verify/%s", verificationToken.getToken());
    String message = "Please click the following link to activate your account:";

    SimpleMailMessage email = new SimpleMailMessage();

    email.setTo(recipientAddress);
    email.setSubject(subject);
    email.setText(String.format("%s\r\n%s%s", message, applicationUrl, confirmationUrl));
    mailSender.send(email);
  }

  private User convertUserDtoToUser(UserDto userDto) {
    User user = new User();
    user.setUsername(userDto.getUsername());
    if (!StringUtils.isBlank(userDto.getPassword())) {
      user.setPassword(passwordEncoder.encode(userDto.getPassword()));
    }
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
    userDto.setEmail(user.getEmail());
    return userDto;
  }

  public UserDto findByUserByUsername(String username) {
    User user = getUserByUsername(username);
    return convertUserToUserDto(user);
  }

  public UserDto verifyUser(String username, String password) {
    User user = getUserByUsername(username);
    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new IncorrectPasswordException(
          ErrorCodeEnum.INCORRECT_PASSWORD,
          String.format(
              "Supplied password does not match actual password for user with username: %s",
              username));
    }
    return convertUserToUserDto(user);
  }

  private User getUserByUsername(String username) {
    return userRepository
        .findByUsername(username)
        .orElseThrow(
            () ->
                new ResourceNotFoundException(
                    String.format("User with username not found: %s", username)));
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository
        .findByUsername(username)
        .orElseThrow(
            () ->
                new UsernameNotFoundException(
                    String.format("User with username not found: %s", username)));
  }
}
