import { Container } from '@mui/material';
import React from 'react';
import { Card } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import UserVerified from './user-verified';

export default { title: 'Messages/User Verify Success' }

export const Example = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Card>
          <UserVerified />
        </Card>
      </Container>
    </BrowserRouter>
  )
}