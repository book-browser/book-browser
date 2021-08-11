import { CircularProgress, Container } from '@material-ui/core';
import { ErrorAlert } from 'components/error/error-alert';
import { BookForm } from 'components/form/book-form/book-form';
import BookSubmissionSuccess from 'components/message/book-submission-success/book-submission-success';
import { useCreateBook } from 'hooks/book.hook';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { BookSubmission } from 'types/book-submission';

const AddBookForm = ({ loading, onSubmit, error }: { loading: boolean, onSubmit: (book: BookSubmission) => void, error: Error }) => {
  return (
    <Card>
      <Card.Title className="mt-3 ml-3">Add a New Book</Card.Title>
      <BookForm
        onSubmit={onSubmit}
        footer={
          <div>
            {error && <ErrorAlert error={error} />}
            {!loading && <Button variant="primary" type="submit">Submit</Button>}
            {loading && <Button variant="primary" type="submit" disabled>Submiting <CircularProgress color="secondary" size={"15px"} /></Button>}
          </div>
        }
      />
    </Card>
  )
}

export const CreateBookPage = () => {
  const { execute, data: book, loading, error } = useCreateBook();

  const onSubmit = (bookSubmission: BookSubmission) => {
    execute(bookSubmission);
  }

  return (
    <Container maxWidth="md" className="mt-3">
      {!book && <AddBookForm loading={loading} onSubmit={onSubmit} error={error} /> }
      {book && <Card><BookSubmissionSuccess book={book} /></Card>}
    </Container>
  )
}