import { Container } from '@mui/material';
import React from 'react';
import { Card } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import VerificationLinkResent from './verification-link-resent';

export default { title: 'Messages/Verification Link Resent' }

export const Example = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Card>
          <VerificationLinkResent />
        </Card>
      </Container>
    </BrowserRouter>
  )
}