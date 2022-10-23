import Message from 'components/message/message';
import React from 'react';
import { ApiError } from 'types/api-error';

export type SomethingWentWrongProps = {
  error: Error;
};

export const SomethingWentWrong = ({ error }: SomethingWentWrongProps) => {
  const apiError: ApiError | undefined = error.name === 'ApiError' && (error as ApiError);

  return (
    <Message variant="danger" title="Oops. Something went wrong." lead="Something went wrong. Please try again later.">
      {apiError?.correlationId && <small>{`CorrelationId: ${apiError.correlationId}`}</small>}
      {apiError && <small>{`Timestamp: ${apiError.timestamp}`}</small>}
    </Message>
  );
};
