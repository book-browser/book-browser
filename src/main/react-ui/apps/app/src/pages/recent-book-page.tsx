import { Container } from '@mui/material';
import BookList from 'components/book-list/book-list';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import Pagination from 'components/pagination/pagination';
import { Location } from 'history';
import { useFindAllBooks } from 'hooks/book.hook';
import React, { useEffect, useMemo, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { generateEncodedUrl, parseParams } from 'utils/location-utils';
import * as yup from 'yup';

declare type RecentBookPageParams = {
  page: number;
};

const readParams = (location: Location) => {
  const schema = yup.object().shape({
    page: yup
      .number()
      .min(0)
      .transform((val) => val - 1)
      .default(0)
  }) as yup.SchemaOf<RecentBookPageParams>;

  return parseParams(location, schema);
};

const RecentBookPageContent = () => {
  const { data: books, loading, error, execute: findAll } = useFindAllBooks();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => readParams(location), [location]);
  const [page, setPage] = useState(params.page);

  const changePage = (newPage) => {
    navigate(generateEncodedUrl('/recent', { page: newPage > 0 ? newPage + 1 : '' }));
  };

  useEffect(() => {
    document.title = 'Recent Releases | BookBrowser';
  }, []);

  useEffect(() => {
    findAll({ page, endReleaseDate: new Date(Date.now()), limit: 18, order: 'desc', sort: 'releaseDate' });
  }, [page, findAll]);

  useEffect(() => {
    if (params.page !== page) {
      setPage(params.page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorAlert uiMessage="Unable to load recent books" error={error} />;
  } else if (books) {
    return (
      <div>
        <BookList books={books.items} />
        <Pagination page={page} totalPages={books.totalPages} onPageChange={changePage} />
      </div>
    );
  }
  return null;
};

const RecentBookPage = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Recent Releases</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="heading-main">Recent Releases</h1>
      <RecentBookPageContent />
    </Container>
  );
};

export default RecentBookPage;
