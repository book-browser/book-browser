import React from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { Button, Card, Nav } from 'react-bootstrap';
import { BookForm } from 'components/form/book-form';
import { Book } from 'types/book';
import { useCreateBook } from 'hooks/book.hook';
import { BookSubmission } from 'types/book-submission';
import { Confirmation } from 'components/confirmation/confirmation';
import { Link } from 'react-router-dom';
import { ErrorAlert } from 'components/error/error-alert';

const CreateBookConfirmation = ({ book }: { book: Book }) => {
  return (
    <Confirmation
      variant="success"
      title="Success"
    >
      <p>Your submission has been successful!</p>

      <Nav className="justify-content-between">
        <Nav.Item className="ml-n3">
          <Nav.Link as={Link} to="/home">Return Home</Nav.Link>
        </Nav.Item>
        <Nav.Item className="mr-n3">
          <Nav.Link as={Link} to={`/book/${book.id}`}>View Submission</Nav.Link>
        </Nav.Item>
      </Nav>

    </Confirmation>
  )
}

const AddBookForm = ({ loading, onSubmit, error }: { loading: boolean, onSubmit: (book: BookSubmission) => void, error: Error }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Add a New Book</Card.Title>
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
      </Card.Body>
    </Card>
  )
}

export const CreateBookPage = () => {
  const { execute, data: book, loading, error } = useCreateBook();

  const onSubmit = (bookSubmission: BookSubmission) => {
    execute(bookSubmission);
  }

  return (
    <Container maxWidth="sm" className="mt-3">
      {!book && <AddBookForm loading={loading} onSubmit={onSubmit} error={error} /> }
      {book && <CreateBookConfirmation book={book} /> }
    </Container>
  )
}