import { Container } from '@material-ui/core';
import { BookDetails } from 'components/book-details/book-details';
import { NotFound } from 'components/not-found/not-found';
import { SomethingWentWrong } from 'components/something-went-wrong/something-went-wrong';
import { useGetBook } from 'hooks/book.hook';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiError } from 'types/api-error';

export const BookPage = () => {
  const { data: book, execute, loading, error } = useGetBook();
  const { id } = useParams();
  const apiError = error instanceof ApiError && error as ApiError;
  const notFound = apiError?.status === 404 ;

  useEffect(() => {
    execute(id);
  }, []);

  return (
    <Container maxWidth="md" className="mt-3">
      {book && <BookDetails book={book} />}
      {error && 
        (notFound ? <NotFound /> : <SomethingWentWrong error={error}/>)
      }
    </Container>
  );
};
