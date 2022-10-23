import { CircularProgress, Container } from '@mui/material';
import { ErrorAlert } from 'components/error/error-alert';
import { BookForm } from 'components/form/book-form/book-form';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import Heading from 'components/navigation/heading/heading';
import { useGetBook, useSaveBook } from 'hooks/book.hook';
import { usePrompt } from 'hooks/router.hook';
import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Book } from 'types/book';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: loadedBook, execute: load, loading: loadingBook, error: loadError } = useGetBook();
  const { data: savedBook, execute: save, loading: savingBook, error: saveError } = useSaveBook();

  const [book, setBook] = useState<Book>();
  const [saved, setSaved] = useState(true);
  usePrompt('Are you sure to leave (all changes will be lost)?', !saved);

  const onChange = (changedBook: Book) => {
    setBook(changedBook);
    setSaved(false);
  };

  const onSubmit = (bookSubmission: Book) => {
    save(bookSubmission);
  };

  const reset = () => {
    setBook(savedBook || loadedBook);
  };

  const cancel = () => {
    navigate(`/books/${book.id}`);
  };

  useEffect(() => {
    if (book) {
      document.title = `Edit ${(savedBook || loadedBook).title}${saved ? '' : '*'} | BookBrowser`;
    } else {
      document.title = 'Edit | BookBrowser';
    }
  }, [book, savedBook, loadedBook, saved]);

  useEffect(() => {
    load(Number(id));
  }, [id, load]);

  useEffect(() => {
    if (loadedBook) {
      setBook(loadedBook);
    }
  }, [loadedBook]);

  useEffect(() => {
    if (savedBook) {
      setBook(savedBook);
      setSaved(true);
    }
  }, [savedBook]);

  return (
    <Container maxWidth="md" className="mt-3">
      {loadingBook && <Loading />}
      {loadError && <ErrorMessage error={loadError} />}
      {book && (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/books' }}>
              Books
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/books/${book.id}` }}>
              {(savedBook || loadedBook)?.title}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
          </Breadcrumb>
          <Heading as="h1">Edit Book</Heading>
          <BookForm
            value={book}
            onChange={onChange}
            onSubmit={onSubmit}
            footer={
              <div>
                {saveError && (
                  <ErrorAlert uiMessage="Something went wrong. Unable to save this entry." error={saveError} />
                )}
                {!saveError && savedBook && (
                  <Alert variant="success" className="mb-2">
                    Changes successfully saved
                  </Alert>
                )}
                <div className="d-flex">
                  <Button className="me-2" variant="secondary" disabled={savingBook} onClick={cancel}>
                    Cancel
                  </Button>
                  <Button className="me-auto" variant="secondary" disabled={savingBook} onClick={reset}>
                    Reset
                  </Button>
                  <Button variant="primary" type="submit" disabled={savingBook}>
                    {!savingBook && <span>Save</span>}
                    {savingBook && (
                      <span>
                        Saving <CircularProgress color="secondary" size={'15px'} />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      )}
    </Container>
  );
};

export default EditBookPage;
