package com.tabroadn.bookbrowser.api;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.tabroadn.bookbrowser.dto.ApiError;
import com.tabroadn.bookbrowser.exception.IncorrectPasswordException;
import com.tabroadn.bookbrowser.exception.UserAlreadyExistException;
import com.tabroadn.bookbrowser.exception.UserNotFoundException;
import com.tabroadn.bookbrowser.exception.VerificationTokenExpiredException;

@ControllerAdvice
public class RestResponseEntityExceptionHandler 
  extends ResponseEntityExceptionHandler {
 
    @ExceptionHandler(value = { UserAlreadyExistException.class, VerificationTokenExpiredException.class })
    protected ResponseEntity<Object> handleConflict(RuntimeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
    
    @ExceptionHandler(UserNotFoundException.class)
    protected ResponseEntity<ApiError> handleUserNotFound(UserNotFoundException exception, WebRequest request) {
    	ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.NOT_FOUND,
    			exception.getErrorCode(),
    			exception.getMessage(),
    			request.getContextPath());
    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiError);
    }
    
    @ExceptionHandler(IncorrectPasswordException.class)
    protected ResponseEntity<ApiError> handleIncorrectPassword(IncorrectPasswordException exception, WebRequest request) {
    	ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.UNAUTHORIZED,
    			exception.getErrorCode(),
    			exception.getMessage(),
    			request.getContextPath());
    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
    }
}
