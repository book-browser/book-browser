import { Confirmation } from 'components/confirmation/confirmation';
import React from 'react';
import { ApiError } from 'types/api-error';

interface SomethingWentWrongProps {
  error: Error
}

export const SomethingWentWrong = ({ error }: SomethingWentWrongProps) => {
  const apiError = error instanceof ApiError && error as ApiError;

  return (
    <Confirmation variant="danger" title="Oops. Something went wrong.">
      <p>Something went wrong. Please try again later.</p>
      {apiError && <small>{`CorrelationId: ${apiError.correlationId}`}</small>}
    </Confirmation>
  )
};