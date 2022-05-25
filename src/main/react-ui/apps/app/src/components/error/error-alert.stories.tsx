import React from 'react';
import { ErrorAlert } from './error-alert';

export default { title: 'Error Alert' };

export const SingleError = () => {
  const error = new Error('Please fill in your first name');
  return <ErrorAlert uiMessage="Something went wrong" error={error} />;
};

export const SomethingWentWrongError = () => {
  const error = {
    name: 'ApiError',
    timestamp: 1627848795.679339,
    status: 500,
    httpError: 'INTERNAL_SERVER_ERROR',
    message: 'Something unexpected occurred',
    errors: [],
    path: 'http://bookbrowser-env.eba-3wq8kmby.us-east-1.elasticbeanstalk.com/api/book',
    correlationId: '434fc0e8-b23a-462b-aa84-a6f3568517e4'
  };

  return <ErrorAlert uiMessage="Something went wrong" error={error} />;
};
