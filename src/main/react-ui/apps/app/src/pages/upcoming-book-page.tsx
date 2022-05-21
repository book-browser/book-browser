import { Container } from '@mui/material';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import { useFindAll } from 'hooks/book.hook';
import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { parse } from 'query-string';
import BookList from 'components/book-list/book-list';
import Pagination from 'components/pagination/pagination';

const parsePageParam = (page?: string | string[]) => {
  if (page) {
    let value;
    if (Array.isArray(page)) {
      value = page[0];
    } else {
      value = page;
    }
    if (!Number.isNaN(Number.parseInt(value))) {
      const num = Number.parseInt(value);
      if (num > 0) {
        return num - 1;
      }
    }
  }
  return 0;
};

const UpcomingBookPageContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = parse(location.search);
  const paramPage = parsePageParam(params.page);

  const [page, setPage] = useState(paramPage);
  const { loading, data, error, execute } = useFindAll();

  const changePage = (newPage) => {
    navigate(`/coming-soon${newPage > 0 ? `?page=${newPage + 1}` : ''}`);
  };

  useEffect(() => {
    document.title = 'Coming Soon | BookBrowser';
  }, []);

  useEffect(() => {
    execute({ page, startReleaseDate: new Date(Date.now()), limit: 15, order: 'asc', sort: 'releaseDate' });
  }, [page, execute]);

  useEffect(() => {
    setPage(paramPage);
  }, [paramPage]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorAlert uiMessage="Unable to load recent books" error={error} />;
  } else if (data) {
    return (
      <div>
        {data.items && <BookList books={data.items} />}
        <Pagination page={page} totalPages={data.totalPages} onPageChange={changePage} />
      </div>
    );
  }
  return null;
};

const UpcomingBookPage = () => {
  return (
    <Container maxWidth="md" className="mt-3">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Coming Soon</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="heading-main">Coming Soon</h1>
      <UpcomingBookPageContent />
    </Container>
  );
};

export default UpcomingBookPage;
