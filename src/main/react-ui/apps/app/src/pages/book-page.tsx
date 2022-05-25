/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { BookDetails } from 'components/book-details/book-details';
import Loading from 'components/loading/loading';
import { NotFound } from 'components/message/not-found/not-found';
import { SomethingWentWrong } from 'components/message/something-went-wrong/something-went-wrong';
import { useGetBook } from 'hooks/book.hook';
import React, { useEffect } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { ApiError } from 'types/api-error';
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
      <Button as={Link as any} to={`/book/${book.id}/edit`} className="ms-auto" variant="primary">
        <EditIcon /> Edit
      </Button>
    </div>
  );
};

const BookPageContent = () => {
  const { data: book, execute, loading, error } = useGetBook();
  const { id } = useParams();
  const apiError = error?.name === 'ApiError' && (error as ApiError);
  const notFound = apiError?.status === 404;

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

  if (loading) {
    return <Loading />;
  }
  if (error) {
    if (notFound) {
      return <NotFound />;
    }
    return <SomethingWentWrong error={error} />;
  }
  if (book) {
    return (
      <>
        <BookPageHeader book={book} />
        <BookDetails book={book} />
      </>
    );
  }
  return null;
};

export const BookPage = () => {
  return (
    <Container maxWidth="lg">
      <BookPageContent />
    </Container>
  );
};
