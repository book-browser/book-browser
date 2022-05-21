import { Container } from '@mui/material';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import { useFindAll } from 'hooks/book.hook';
import React, { useEffect, useMemo, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Pagination from 'components/pagination/pagination';
import BookList from 'components/book-list/book-list';
import * as yup from 'yup';
import { parseParams } from 'utils/location-utils';
import { Location } from 'history';
import { useReferenceData } from 'hooks/reference-data.hook';
import { ReferenceData } from 'types/reference-data';

declare type RecentBookPageParams = {
  page: number;
};

const readParams = (location: Location, referenceData: ReferenceData) => {
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
  const { data: referenceData } = useReferenceData();
  const { data: books, loading, error, execute: findAll } = useFindAll();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => readParams(location, referenceData), [location, referenceData]);
  const [page, setPage] = useState(params.page);

  const changePage = (newPage) => {
    navigate(`/recent${newPage > 0 ? `?page=${newPage + 1}` : ''}`);
  };

  useEffect(() => {
    document.title = 'Recent Releases | BookBrowser';
  }, []);

  useEffect(() => {
    findAll({ page, endReleaseDate: new Date(Date.now()), limit: 15, order: 'desc', sort: 'releaseDate' });
  }, [page]);

  useEffect(() => {
    if (params.page !== page) {
      setPage(params.page);
    }
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
    <Container maxWidth="md">
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
