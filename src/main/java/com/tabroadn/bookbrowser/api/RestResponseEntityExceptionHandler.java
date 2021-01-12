package com.tabroadn.bookbrowser.api;

import java.time.Instant;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.tabroadn.bookbrowser.domain.ErrorCodeEnum;
import com.tabroadn.bookbrowser.dto.ApiError;
import com.tabroadn.bookbrowser.exception.IncorrectPasswordException;
import com.tabroadn.bookbrowser.exception.UserAlreadyExistException;
import com.tabroadn.bookbrowser.exception.UserNotFoundException;
import com.tabroadn.bookbrowser.exception.VerificationTokenExpiredException;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	private static Logger logger = LogManager.getLogger();
	
    @ExceptionHandler(value = { UserAlreadyExistException.class, VerificationTokenExpiredException.class })
    protected ResponseEntity<ApiError> handleConflict(RuntimeException exception, WebRequest request) {
    	ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.BAD_REQUEST,
    			ErrorCodeEnum.UNKNOWN,
    			exception.getMessage(),
    			request.getContextPath());
        return ResponseEntity.badRequest().body(apiError);
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
    
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ApiError> handleDefaultException(Exception exception, WebRequest request) {
    	UUID correlationId = UUID.randomUUID();
    	logger.error(String.format("%s %s", correlationId.toString(), exception.getMessage()));
    	exception.printStackTrace();
    	ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.UNAUTHORIZED,
    			ErrorCodeEnum.UNKNOWN,
    			exception.getMessage(),
    			request.getContextPath());
    	apiError.setCorrelationId(correlationId.toString());
    	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiError);
    }
}
