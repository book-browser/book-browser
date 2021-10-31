import { CircularProgress, Container } from '@material-ui/core';
import { ErrorAlert } from 'components/error/error-alert';
import { BookForm } from 'components/form/book-form/book-form';
import { useGetBook, useSaveBook } from 'hooks/book.hook';
import React, { useEffect } from 'react';
import { Alert, Breadcrumb, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Book } from 'types/book';

const EditBookPage = () => {
  const { id } = useParams();
  const { data: book, execute, loading, error } = useGetBook();
  const { data: savedBook, execute: save, loading: saving, error: saveError } = useSaveBook();
 
  const onSubmit = (bookSubmission: Book) => {
    save(bookSubmission);
  }
  
  useEffect(() => {
    execute(id);
  }, [id]);

  return (
    <Container maxWidth="md" className="mt-3">
      {!loading && (
        <div>
          <h2>Edit Book</h2>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/home"}}>Home</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{to: `/book/${book?.id}`}}>{book?.title}</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
          </Breadcrumb>
          <BookForm
            initialValue={book}
            onSubmit={onSubmit}
            footer={
              <div>
                {saveError && <ErrorAlert error={saveError} />}
                {!loading && savedBook && <Alert variant="success" className="mb-2">Changes successfully saved</Alert>}
                {!loading && <Button variant="primary" type="submit">Save</Button>}
                {loading && <Button variant="primary" type="submit" disabled>Saving <CircularProgress color="secondary" size={"15px"} /></Button>}
              </div>
            }
          />
        </div>
      )}
    </Container>
  )
}

export default EditBookPage;