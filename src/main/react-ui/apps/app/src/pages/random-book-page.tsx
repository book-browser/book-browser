import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import { useSearch } from 'hooks/book.hook';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const RandomBookPage = () => {
  const history = useHistory();
  const { data, execute, error, loading } = useSearch();

  useEffect(() => {
    execute({ limit: 1 });
  }, []);

  useEffect(() => {
    if (data) {
      history.push(`/book/${data[0].id}`);
    }
  }, [data]);

  useEffect(() => {
    document.title = 'Random Book | BookBrowser';
  }, []);
  
  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorAlert uiMessage="Something went wrong. Unable to process your request" error={error} />
  }
  return null;
};

export default RandomBookPage;