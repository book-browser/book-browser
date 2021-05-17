import React from 'react';
import { Alert } from 'react-bootstrap';
import { ApiError } from "types/api-error"
import WarningIcon from '@material-ui/icons/Warning';

export interface ErrorAlertProps {
  error: Error
}

export const ErrorAlert = (props: ErrorAlertProps) => {
  if (props.error instanceof ApiError) {
    const apiError = props.error as ApiError;

    return (
      <Alert variant="danger">
        <div className="d-flex align-items-start">
          <WarningIcon className="mr-2" />
          <div>Something went wrong</div>
        </div>
        <ul>
          {
            apiError.errors.map((error) => (
              <li className="text-break">{error}</li>
            ))
          }
        </ul>
      </Alert>
    );
  }

  return (
    <Alert variant="danger" className="d-flex align-items-start">
      <WarningIcon className="mr-2" />
      <div className="text-break">{props.error.message}</div>
    </Alert>
  )
}