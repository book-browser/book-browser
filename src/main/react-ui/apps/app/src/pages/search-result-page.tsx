import { Container } from '@mui/material';
import BookList from 'components/book-list/book-list';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import Heading from 'components/navigation/heading/heading';
import SeriesList from 'components/series-list/series-list';
import { useFindAllBooks } from 'hooks/book.hook';
import { useFindAll as useFindAllSeries } from 'hooks/series.hook';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import { Breadcrumb, Button, FormControl, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { generateEncodedUrl, parseParams } from 'utils/location-utils';
import * as yup from 'yup';

type SearchResultPageParams = {
  query: string;
};

const schema = yup.object().shape({
  query: yup.string().default('')
}) as yup.SchemaOf<SearchResultPageParams>;

export const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = parseParams(location, schema);

  const [query, setQuery] = useState(params.query);
  const [inputText, setInputText] = useState(params.query);

  const { data: books, execute: findAllBooks, loading: loadingBooks, error: booksError } = useFindAllBooks();

  const { data: seriesList, execute: findAllSeries, loading: loadingSeries, error: seriesError } = useFindAllSeries();

  const loading = loadingBooks || loadingSeries;

  const search = () => {
    navigate(generateEncodedUrl('/search', { query: inputText }));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  useEffect(() => {
    findAllBooks({ query, limit: 12 });
    findAllSeries({ query, limit: 12 });
  }, [query, findAllBooks, findAllSeries]);

  useEffect(() => {
    if (params.query !== query) {
      setQuery(params.query);
    }
  }, [params, query]);

  useEffect(() => {
    document.title = 'Search | BookBrowser';
  }, []);

  return (
    <Container maxWidth="lg">
      <Breadcrumb className="mb-1">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Search</Breadcrumb.Item>
      </Breadcrumb>

      <Heading as="h1" className="mb-3">
        Search
      </Heading>

      <InputGroup className="mb-5">
        <FormControl
          size="lg"
          placeholder="Search..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button variant="primary" onClick={search}>
          Search
        </Button>
      </InputGroup>

      {loading && <Loading />}

      {!loading && (
        <>
          <div className="mb-5">
            {booksError && <ErrorAlert error={booksError} />}
            {books && (
              <>
                <Heading as="h2">{`Books (${books.totalElements} Results)`}</Heading>
                <BookList books={books.items} />
                {books.totalElements > 12 && (
                  <div className="d-flex mt-2">
                    <Link to={generateEncodedUrl('/books/search', { query: inputText })}>View More</Link>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="mb-5">
            {seriesError && <ErrorAlert error={seriesError} />}
            {seriesList && (
              <>
                <Heading as="h2">{`Series (${seriesList.totalElements} Results)`}</Heading>
                <SeriesList seriesList={seriesList.items} />
                {seriesList.totalElements > 12 && (
                  <div className="d-flex mt-2">
                    <Link to={generateEncodedUrl('/series/search', { query: inputText })}>View More</Link>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default SearchResultPage;
