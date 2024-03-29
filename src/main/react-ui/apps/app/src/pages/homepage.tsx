import { Container } from '@mui/material';
import BookList from 'components/book-list/book-list';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import Heading from 'components/navigation/heading/heading';
import SeriesList from 'components/series-list/series-list';
import { useEmptyPromise } from 'hooks/promise.hook';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { findAllBooks } from 'services/book.service';
import { findAllSeries } from 'services/series.service';

const loadData = () => {
  return Promise.all([
    findAllSeries({ page: 0, limit: 12, order: 'desc', sort: 'lastUpdated' }),
    findAllBooks({ page: 0, endReleaseDate: new Date(Date.now()), limit: 12, order: 'desc', sort: 'releaseDate' }),
    findAllBooks({ page: 0, startReleaseDate: new Date(Date.now()), limit: 12, order: 'asc', sort: 'releaseDate' })
  ]);
};
const useLoadData = () => useEmptyPromise(loadData);

const HomepageContent = () => {
  const { loading, data, error, execute } = useLoadData();

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    document.title = 'Home | BookBrowser';
  }, []);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage error={error} />;
  } else if (data) {
    return (
      <div>
        <Heading as="h2" id="recently-updated">
          Recently Updated
        </Heading>
        {data[1].items && <SeriesList seriesList={data[0].items} />}
        <div className="d-flex mb-3">
          <Link to="/series/recently-updated">View More</Link>
        </div>
        <Heading as="h2" id="recent-releases">
          Recent Releases
        </Heading>
        {data[1].items && <BookList books={data[1].items} />}
        <div className="d-flex mb-3">
          <Link to="/recent">View More</Link>
        </div>
        <hr />
        <Heading as="h2" id="coming-soon">
          Coming Soon
        </Heading>
        {data[2].items && <BookList books={data[2].items} />}
        <div className="d-flex">
          <Link to="/coming-soon">View More</Link>
        </div>
      </div>
    );
  }
  return null;
};

const Homepage = () => {
  return (
    <Container maxWidth="lg" className="mt-3">
      <HomepageContent />
    </Container>
  );
};

export default Homepage;
