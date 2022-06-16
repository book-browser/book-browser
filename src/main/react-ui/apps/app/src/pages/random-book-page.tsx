import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import { useSearch } from 'hooks/book.hook';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RandomBookPage = () => {
  const navigate = useNavigate();
  const { data, execute, error, loading } = useSearch();

  useEffect(() => {
    execute({ limit: 1 });
  }, [execute]);

  useEffect(() => {
    if (data) {
      navigate(`/books/${data[0].id}`);
    }
  }, [data, navigate]);

  useEffect(() => {
    document.title = 'Random Book | BookBrowser';
  }, []);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorAlert uiMessage="Something went wrong. Unable to process your request" error={error} />;
  }
  return null;
};

export default RandomBookPage;
