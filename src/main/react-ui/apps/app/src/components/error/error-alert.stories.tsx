import React from 'react';
import { ApiError } from 'types/api-error';
import { ErrorAlert } from './error-alert';

export default { title: 'Error Alert' };

export const SingleError = () => {
  const error = new Error("Please fill in your first name");
  return <ErrorAlert error={error} />
};

export const MultipleErrors = () => {
  const error = new ApiError({
    message: "Validation failed for payload",
    errors: [
      "Please fill in your first name",
      "Please fill in your last name"
    ] 
  } as any);

  return <ErrorAlert error={error} />
};