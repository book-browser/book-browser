import { Container } from '@mui/material';
import { BOOK_EXAMPLE } from 'fixtures/book.fixture';
import React from 'react';
import { Card } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import BookSubmissionSuccess from './book-submission-success';

export default { title: 'Messages/Book Submission Success' }

export const Example = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Card>
          <BookSubmissionSuccess book={BOOK_EXAMPLE} />
        </Card>
      </Container>
    </BrowserRouter>
  )
}