package com.tabroadn.bookbrowser.api;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.tabroadn.bookbrowser.dto.ApiError;
import com.tabroadn.bookbrowser.exception.IncorrectPasswordException;
import com.tabroadn.bookbrowser.exception.UserAlreadyExistException;
import com.tabroadn.bookbrowser.exception.UserNotFoundException;
import com.tabroadn.bookbrowser.exception.VerificationTokenExpiredException;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	private static Logger logger = LogManager.getLogger();
	
    @ExceptionHandler(value = { 
    		UserAlreadyExistException.class, 
    		VerificationTokenExpiredException.class, 
    		MultipartException.class })
    protected ResponseEntity<ApiError> handleConflict(RuntimeException exception, HttpServletRequest request) {
    	Throwable cause = getRootCause(exception);
    	
    	ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.BAD_REQUEST,
    			cause.getLocalizedMessage(),
    			request.getRequestURI().toString());

        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(UserNotFoundException.class)
    protected ResponseEntity<ApiError> handleUserNotFound(UserNotFoundException exception, HttpServletRequest request) {
    	ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.NOT_FOUND,
    			exception.getLocalizedMessage(),
    			request.getRequestURI().toString());
    	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiError);
    }
    
    @ExceptionHandler(IncorrectPasswordException.class)
    protected ResponseEntity<ApiError> handleIncorrectPassword(IncorrectPasswordException exception, HttpServletRequest request) {
    	ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.UNAUTHORIZED,
    			exception.getLocalizedMessage(),
    			Arrays.asList(exception.getLocalizedMessage()),
    			request.getRequestURI().toString());
    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
    }
    
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException exception, 
      HttpHeaders headers, 
      HttpStatus status, 
      WebRequest request)  {
    	List<String> errors = new ArrayList<String>();

    	for (FieldError error : exception.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        for (ObjectError error : exception.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }
        
        ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.BAD_REQUEST,
    			"Validation failed for payload",
    			errors,
    			((ServletWebRequest)request).getRequest().getRequestURI().toString());
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
    }
    
    @Override
    protected ResponseEntity<Object> handleBindException(
			BindException exception, HttpHeaders headers, HttpStatus status, WebRequest request) {

    	List<String> errors = new ArrayList<String>();
    	
    	for (FieldError error : exception.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        for (ObjectError error : exception.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }
        
        ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.BAD_REQUEST,
    			"Validation failed for payload",
    			errors,
    			((ServletWebRequest)request).getRequest().getRequestURI().toString());
        
        return new ResponseEntity<Object>(apiError, HttpStatus.BAD_REQUEST);
	}
    
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
      MissingServletRequestParameterException exception, HttpHeaders headers, 
      HttpStatus status, WebRequest request) {
        String error = exception.getParameterName() + " parameter is missing";
       
        ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.BAD_REQUEST,
    			error,
    			((ServletWebRequest)request).getRequest().getRequestURI().toString());
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
    }
    
    @ExceptionHandler({ ConstraintViolationException.class })
    public ResponseEntity<Object> handleConstraintViolation(
      ConstraintViolationException exception, WebRequest request) {
        List<String> errors = new ArrayList<String>();
        for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
        	errors.add(violation.getPropertyPath() + ": " + violation.getMessage());
        }

        ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.BAD_REQUEST,
    			"Validation failed for payload",
    			errors,
    			((ServletWebRequest)request).getRequest().getRequestURI().toString());
       
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
    }
    
    @ExceptionHandler({ MethodArgumentTypeMismatchException.class })
    public ResponseEntity<Object> handleMethodArgumentTypeMismatch(
      MethodArgumentTypeMismatchException ex, WebRequest request) {
        String error = 
          ex.getName() + " should be of type " + ex.getRequiredType().getName();

        ApiError apiError = new ApiError(
    			Instant.now(),
    			HttpStatus.BAD_REQUEST,
    			error,
    			((ServletWebRequest)request).getRequest().getRequestURI().toString());
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
    }

	@ExceptionHandler(Exception.class)
	protected ResponseEntity<ApiError> handleDefaultException(Exception exception, HttpServletRequest request) {
		UUID correlationId = UUID.randomUUID();
		logger.error(String.format("%s %s", correlationId.toString(), exception.getMessage()));
		exception.printStackTrace();
		ApiError apiError = new ApiError(
				Instant.now(),
				HttpStatus.INTERNAL_SERVER_ERROR,
				"Something unexpected occurred",
				request.getRequestURL().toString());
		apiError.setCorrelationId(correlationId.toString());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiError);
	}

	public static Throwable getRootCause(Throwable throwable) {
	    if (throwable.getCause() != null)
	        return getRootCause(throwable.getCause());
	
	    return throwable;
	}
}
