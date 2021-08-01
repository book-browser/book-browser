import { Container } from '@material-ui/core';
import React from 'react';
import { ApiError } from 'types/api-error';
import { SomethingWentWrong } from './something-went-wrong';

export default { title: 'Something Went Wrong' };

export const Example = () => {
  const error = new Error();
  return (
    <Container maxWidth="sm">
      <SomethingWentWrong error={error} />
    </Container>
  )
};

export const WithApiError = () => {
  const error = new ApiError({ correlationId: '123-123' } as any);
  return (
    <Container maxWidth="sm">
      <SomethingWentWrong error={error} />
    </Container>
  )
};