import React from 'react';
import { Alert } from 'react-bootstrap';
import { ApiError } from "types/api-error"
import WarningIcon from '@material-ui/icons/Warning';
import './error-alert.scss';

export interface ErrorAlertProps {
  error: Error
}

export const ErrorAlert = (props: ErrorAlertProps) => {
  let errors = [];

  if (props.error instanceof ApiError) {
    const apiError = props.error as ApiError;
    errors = apiError.errors;
  }

  return (
    <Alert variant="danger" className="error-alert">
      <div className="error-alert-heading">
        <WarningIcon className="error-alert-icon" />
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