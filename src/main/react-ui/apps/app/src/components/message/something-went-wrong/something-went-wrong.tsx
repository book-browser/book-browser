import Message from 'components/message/message';
import React from 'react';
import { ApiError } from 'types/api-error';

interface SomethingWentWrongProps {
  error: Error
}

export const SomethingWentWrong = ({ error }: SomethingWentWrongProps) => {
  const apiError = error.name === 'ApiError' && error as ApiError;

  return (
    <Message
      variant="danger"
      title="Oops. Something went wrong."
      lead="Something went wrong. Please try again later."
    >
      {apiError?.correlationId && <small>{`CorrelationId: ${apiError.correlationId}`}</small>}
    </Message>
  )
};