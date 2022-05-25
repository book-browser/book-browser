import { CircularProgress, Container } from '@mui/material';
import { ErrorAlert } from 'components/error/error-alert';
import { BookForm } from 'components/form/book-form/book-form';
import Loading from 'components/loading/loading';
import { NotFound } from 'components/message/not-found/not-found';
import { useGetBook, useSaveBook } from 'hooks/book.hook';
import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ApiError } from 'types/api-error';
import { Book } from 'types/book';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UNSAVED_MESSAGE = 'Are you sure that you want to leave with unsaved changes?';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: loadedBook, execute: load, loading: loadingBook, error: loadError } = useGetBook();
  const { data: savedBook, execute: save, loading: savingBook, error: saveError } = useSaveBook();
  const notFound = loadError?.name === 'ApiError' && (loadError as ApiError)?.status === 404;

  const [book, setBook] = useState<Book>();
  const [saved, setSaved] = useState(true);

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
    navigate(`/book/${book.id}`);
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
      {loadError && !notFound && (
        <ErrorAlert uiMessage="Something went wrong. Unable to load this entry." error={loadError} />
      )}
      {loadError && notFound && <NotFound />}
      {book && (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/books' }}>
              Books
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/book/${book.id}` }}>
              {(savedBook || loadedBook)?.title}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="heading-main">Edit Book</h1>
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
          {/* <Prompt when={!saved} message={UNSAVED_MESSAGE} /> */}
        </div>
      )}
    </Container>
  );
};

export default EditBookPage;
