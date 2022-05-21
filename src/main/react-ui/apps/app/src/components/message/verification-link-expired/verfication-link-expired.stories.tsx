import { Container } from '@mui/material';
import React from 'react';
import { Card } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import VerificationLinkExpired from './verification-link-expired';

export default { title: 'Messages/Verification Link Expired' }

export const Example = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Card>
          <VerificationLinkExpired />
        </Card>
      </Container>
    </BrowserRouter>
  )
}