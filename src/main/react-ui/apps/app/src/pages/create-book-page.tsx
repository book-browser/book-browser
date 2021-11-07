import { CircularProgress, Container } from '@material-ui/core';
import { ErrorAlert } from 'components/error/error-alert';
import { BookForm } from 'components/form/book-form/book-form';
import BookSubmissionSuccess from 'components/message/book-submission-success/book-submission-success';
import { useSaveBook } from 'hooks/book.hook';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Book } from 'types/book';
import { Prompt } from 'react-router-dom';

const AddBookForm = ({ loading, onChange, onSubmit, error }: { loading: boolean, onChange: () => void, onSubmit: (book: Book) => void, error: Error }) => {
  return (
    <Card>
      <Card.Title className="mt-3 ml-3">Add a New Book</Card.Title>
      <BookForm
        onChange={onChange}
        onSubmit={onSubmit}
        footer={
          <div>
            {error && <ErrorAlert uiMessage="Something went wrong. Unable to add your entry." error={error} />}
            {!loading && <Button variant="primary" type="submit">Submit</Button>}
            {loading && <Button variant="primary" type="submit" disabled>Submitting <CircularProgress color="secondary" size={"15px"} /></Button>}
          </div>
        }
      />
    </Card>
  )
}

export const CreateBookPage = () => {
  const { execute, data: book, loading, error } = useSaveBook();
  const [saved, setSaved] = useState(true);

  const onChange = () => {
    setSaved(false);
  }

  const onSubmit = (bookSubmission: Book) => {
    execute(bookSubmission);
  }

  useEffect(() => {
    document.title = "Add Book | BookBrowser";
  }, []);

  useEffect(() => {
    if (book) {
      setSaved(true);
    }
  }, [book])

  return (
    <Container maxWidth="md" className="mt-3">
      {!book && <AddBookForm loading={loading} onChange={onChange} onSubmit={onSubmit} error={error} /> }
      {book && <Card><BookSubmissionSuccess book={book} /></Card>}
      <Prompt when={!saved} message="Are you sure to leave (all changes will be lost)?" />
    </Container>
  )
}