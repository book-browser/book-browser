import { CircularProgress, Container } from '@material-ui/core';
import { ErrorAlert } from 'components/error/error-alert';
import { BookForm } from 'components/form/book-form/book-form';
import Loading from 'components/loading/loading';
import { NotFound } from 'components/message/not-found/not-found';
import { useGetBook, useSaveBook } from 'hooks/book.hook';
import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Button } from 'react-bootstrap';
import { useParams, useHistory, Link } from 'react-router-dom';
import { ApiError } from 'types/api-error';
import { Book } from 'types/book';

const EditBookPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: loadedBook, execute: load, loading: loadingBook, error: loadError } = useGetBook();
  const { data: savedBook, execute: save, loading: savingBook, error: saveError } = useSaveBook();
  const notFound = loadError?.name === 'ApiError' && (loadError as ApiError)?.status === 404 ;

  const [book, setBook] = useState<Book>();
 
  const onChange = (changedBook: Book) => {
    setBook(changedBook);
  }

  const onSubmit = (bookSubmission: Book) => {
    save(bookSubmission);
  }

  const reset = () => {
    setBook(savedBook || loadedBook);
  }

  const cancel = () => {
    history.push(`/book/${book!.id}`);
  }
  
  useEffect(() => {
    load(id);
  }, [id]);

  useEffect(() => {
    if (loadedBook) {
      setBook(loadedBook);
    }
  }, [loadedBook]);

  useEffect(() => {
    if (savedBook) {
      setBook(savedBook);
    }
  }, [savedBook]);

  return (
    <Container maxWidth="md" className="mt-3">
      {loadingBook && <Loading />}
      {loadError && !notFound && <ErrorAlert uiMessage="Something went wrong. Unable to load this entry." error={loadError} />}
      {loadError && notFound && <NotFound />}
      {book && (
        <div>
          <h2>Edit Book</h2>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/home"}}>Home</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: `/book/${book!.id}`}}>{(savedBook || loadedBook)?.title}</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
          </Breadcrumb>
          <BookForm
            value={book}
            onChange={onChange}
            onSubmit={onSubmit}
            footer={
              <div>
                {saveError && <ErrorAlert uiMessage="Something went wrong. Unable to save this entry." error={saveError} />}
                {!saveError && savedBook && <Alert variant="success" className="mb-2">Changes successfully saved</Alert>}
                <>
                  <div className="d-flex">
                    <Button className="mr-2" variant="secondary" disabled={savingBook} onClick={cancel}>Cancel</Button>
                    <Button className="mr-auto" variant="secondary" disabled={savingBook} onClick={reset}>Reset</Button>
                    <Button variant="primary" type="submit" disabled={savingBook}>
                      {!savingBook && <span>Save</span>}
                      {savingBook && <span>Saving <CircularProgress color="secondary" size={"15px"} /></span>}
                    </Button>
                  </div>
                </>
              </div>
            }
          />
        </div>
      )}
    </Container>
  )
}

export default EditBookPage;