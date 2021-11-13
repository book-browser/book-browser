import { Container } from '@material-ui/core';
import BookCard from 'components/book-card/book-card';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import { useFindAll } from 'hooks/book.hook';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomepageContent = () => {
  const { loading, data, error, execute } = useFindAll();

  useEffect(() => {
    execute({ page: 0, endReleaseDate: new Date(Date.now()), limit: 10 });
  }, []);

  useEffect(() => {
    document.title = 'Home | BookBrowser';
  }, []);

  if (loading) {
    return <Loading />
  } else if (error) {
    return <ErrorAlert uiMessage="Unable to data" error={error} />
  } else if (data) {
    return (
      <div>
        <h3>Recent Releases</h3>
        <div className="d-flex flex-wrap mb-3">
          {data.items && data.items.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
        <div className="d-flex">
          <Link to="recent">View More</Link>
        </div>
      </div>
    );
  }
  return null;
};

const Homepage = () => {
  return (
    <Container maxWidth="md" className="mt-3">
      <HomepageContent />
    </Container>
  );
};

export default Homepage;
