import { Container } from '@material-ui/core';
import React from 'react';
import { Card } from 'react-bootstrap';
import { SomethingWentWrong } from './something-went-wrong';

export default { title: 'Messages/Something Went Wrong' };

export const Example = () => {
  const error = new Error();
  return (
    <Container>
      <Card>
        <SomethingWentWrong error={error} />
      </Card>
    </Container>
  )
};

export const WithApiError = () => {
  const error = { name: 'ApiError', correlationId: '123-123' } as any;
  return (
    <Container>
      <Card>
        <SomethingWentWrong error={error} />
      </Card>
    </Container>
  )
};