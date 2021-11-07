import React from 'react';
import { Alert } from 'react-bootstrap';
import { ApiError } from "types/api-error"
import './error-alert.scss';

export interface ErrorAlertProps {
  uiMessage: string,
  error: Error,
  className?: string
}

export const ErrorAlert = (props: ErrorAlertProps) => {
  let apiError: ApiError;
  if (props.error.name === 'ApiError') {
    apiError = props.error as ApiError;
  }

  return (
    <Alert variant="danger" className={`error-alert ${props.className}`}>
      <div className="error-alert-heading">
        <div className="error-alert-message">{props.uiMessage}</div>
      </div>
      <div><small>{`Message: ${props.error.message}`}</small></div>
      {apiError && (
        <>
          {apiError.correlationId && <div><small>{`CorrelationId: ${apiError.correlationId}`}</small></div>}
          <div><small>{`Timestamp: ${apiError.timestamp}`}</small></div>
        </>
      )}
    </Alert>
  )
}