import { Container } from '@material-ui/core';
import BookCard from 'components/book-card/book-card';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import { useFindAll } from 'hooks/book.hook';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Pagination } from 'react-bootstrap';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { parse } from 'query-string';

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
}

const UpcomingBookPageContent = () => {
  const history = useHistory();
  const location = useLocation();
  const params = parse(location.search)
  const paramPage = parsePageParam(params.page);

  const [page, setPage] = useState(paramPage);
  const { loading, data, error, execute } = useFindAll();

  const changePage = (newPage) => {
    history.push(`/coming-soon${newPage > 0 ? `?page=${newPage + 1}` : ''}`);
  }

  useEffect(() => {
    document.title = 'Coming Soon | BookBrowser';
  }, []);

  useEffect(() => {
    execute({ page, startReleaseDate: new Date(Date.now()), limit: 15, order: 'asc', sort: 'releaseDate' })
  }, [page]);

  useEffect(() => {
    setPage(paramPage);
  }, [paramPage]);

  if (loading) {
    return <Loading />
  } else if (error) {
    return <ErrorAlert uiMessage="Unable to load recent books" error={error} />
  } else if (data) {
    return (
      <div>
        <div className="d-flex flex-wrap mb-4">
          {data.items && data.items.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
        <Pagination className="justify-content-center">
          {page != 0 && <Pagination.First onClick={() => changePage(0)} />}
          {page > 0 && page - 1 < data.totalPages && <Pagination.Prev onClick={() => changePage(page - 1)} />}
          {page - 1 > 0 && page - 2 < data.totalPages && <Pagination.Item onClick={() => changePage(page - 2)}>{page - 1}</Pagination.Item>}
          {page > 0 && page - 1 < data.totalPages && <Pagination.Item onClick={() => changePage(page - 1)}>{page}</Pagination.Item>}
          {page < data.totalPages && <Pagination.Item active>{page + 1}</Pagination.Item>}
          {page + 1 < data.totalPages && <Pagination.Item onClick={() => changePage(page + 1)}>{page + 2}</Pagination.Item>}
          {page + 2 < data.totalPages && <Pagination.Item onClick={() => changePage(page + 2)}>{page + 3}</Pagination.Item>}
          {page + 1 < data.totalPages && <Pagination.Next onClick={() => changePage(page + 1)} />}
          {page != (data.totalPages - 1) && <Pagination.Last onClick={() => changePage(data.totalPages - 1)} />}
        </Pagination>
      </div>
    );
  }
  return null;
};

const UpcomingBookPage = () => {
  return (
    <Container maxWidth="md" className="mt-3">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/home"}}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Coming Soon</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Coming Soon</h2>
      <UpcomingBookPageContent />
    </Container>
  );
};

export default UpcomingBookPage;