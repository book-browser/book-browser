/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';
import { BookDetails } from 'components/book-details/book-details';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import { useGetBook } from 'hooks/book.hook';
import React, { useEffect } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Book } from 'types/book';

const BookPageHeader = ({ book }: { book: Book }) => {
  return (
    <div className="d-flex align-items-start mb-3">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        {book.seriesId && (
          <>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
              Series
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/series/${book.seriesId}` }}>
              {book.seriesTitle}
            </Breadcrumb.Item>
          </>
        )}
        {!book.seriesId && (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/books' }}>
            Books
          </Breadcrumb.Item>
        )}

        <Breadcrumb.Item active>{book.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Button as={Link as any} to={`/books/${book.id}/edit`} className="ms-auto" variant="primary">
        <EditIcon /> Edit
      </Button>
    </div>
  );
};

const BookPageContent = () => {
  const { data: book, execute, loading, error } = useGetBook();
  const { id } = useParams();

  useEffect(() => {
    execute(Number(id));
  }, [id, execute]);

  useEffect(() => {
    if (book) {
      document.title = `${book.title} | BookBrowser`;
    } else {
      document.title = 'BookBrowser';
    }
  }, [book]);

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {book && (
        <>
          <BookPageHeader book={book} />
          <BookDetails book={book} />
        </>
      )}
    </>
  );
};

export const BookPage = () => {
  return (
    <Container maxWidth="lg">
      <BookPageContent />
    </Container>
  );
};

export default BookPage;
