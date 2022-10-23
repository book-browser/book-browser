import React from 'react';
import { ApiError } from 'types/api-error';
import { NotFound } from '../not-found/not-found';
import { SomethingWentWrong } from '../something-went-wrong/something-went-wrong';

export type ErrorMessageProps = {
  error: Error;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  const apiError = error?.name === 'ApiError' && (error as ApiError);
  const notFound = apiError?.status === 404;

  if (notFound) {
    return <NotFound />;
  }
  return <SomethingWentWrong error={error} />;
};
