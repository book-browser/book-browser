import { Container } from '@mui/material';
import { NotFound } from 'components/message/not-found/not-found';
import React, { useEffect } from 'react';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Page Not Found | BookBrowser';
  }, []);

  return (
    <Container maxWidth="sm" className="mt-3">
      <NotFound />
    </Container>
  )
};

export default NotFoundPage;