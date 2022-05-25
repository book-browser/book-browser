import { Container } from '@mui/material';
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
  );
};

export const WithApiError = () => {
  const error = { name: 'ApiError', correlationId: '123-123', message: 'message' };
  return (
    <Container>
      <Card>
        <SomethingWentWrong error={error} />
      </Card>
    </Container>
  );
};
