import { Container } from '@material-ui/core';
import { BookForm } from 'components/form/book-form/book-form';
import { useGetBook } from 'hooks/book.hook';
import React, { useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { BookSubmission } from 'types/book-submission';

const EditBookPage = () => {
  const { id } = useParams();
  const { data: book, execute, loading, error } = useGetBook();
 
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
          <BookForm initialValue={book as BookSubmission} />
        </div>
      )}
    </Container>
  )
}

export default EditBookPage;