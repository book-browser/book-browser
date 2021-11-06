import React from 'react';
import { Alert } from 'react-bootstrap';
import { ApiError } from "types/api-error"
import './error-alert.scss';

export interface ErrorAlertProps {
  error: Error,
  className?: string
}

export const ErrorAlert = (props: ErrorAlertProps) => {
  let errors = [];

  if (props.error.name === 'ApiError') {
    const apiError = props.error as ApiError;
    if (apiError.errors) {
      errors = apiError.errors;
    }
  }

  return (
    <Alert variant="danger" className={`error-alert ${props.className}`}>
      <div className="error-alert-heading">
        <div className="error-alert-message">{props.error.message}</div>
      </div>
      {errors.length > 0 && (
        <ul className="pl-4">
          {errors.map((error) => <li key={error} className="error-alert-item">{error}</li>)}
        </ul>
      )}
    </Alert>
  )
}