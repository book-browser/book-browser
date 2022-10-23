import { Container } from '@mui/material';
import { useFindAllBooks } from 'hooks/book.hook';
import { useReferenceData } from 'hooks/reference-data.hook';
import React, { useEffect, useMemo, useState, KeyboardEvent } from 'react';
import { Breadcrumb, Button, ButtonGroup, FormControl, InputGroup, ToggleButton } from 'react-bootstrap';
import { useLocation, useNavigate, Link, Location } from 'react-router-dom';
import { Genre } from 'types/genre';
import * as yup from 'yup';
import { generateEncodedUrl, parseParams } from 'utils/location-utils';
import { ReferenceData } from 'types/reference-data';
import BookList from 'components/book-list/book-list';
import Pagination from 'components/pagination/pagination';
import Heading from 'components/navigation/heading/heading';
import Loading from 'components/loading/loading';
import { ErrorAlert } from 'components/error/error-alert';

type SearchBookPageParams = {
  query: string;
  genres: string[];
  page: number;
};

const readParams = (location: Location, referenceData: ReferenceData) => {
  const genreNames = referenceData.genres.map((genre) => genre.name.toLocaleLowerCase());

  const schema = yup.object().shape({
    query: yup.string().default(''),
    genres: yup.array(
      yup.string().test({
        test: (val) => genreNames.includes(val.toLocaleLowerCase())
      })
    ),
    page: yup
      .number()
      .min(0)
      .transform((val) => val - 1)
      .default(0)
  }) as yup.SchemaOf<SearchBookPageParams>;

  return parseParams(location, schema);
};

const SearchBookPage = () => {
  const { data } = useReferenceData();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => readParams(location, data), [location, data]);

  const [page, setPage] = useState(params.page);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    params.genres.map((paramGenre) =>
      data.genres.find((genre) => genre.name.toLocaleLowerCase() === paramGenre.toLocaleLowerCase())
    )
  );
  const [query, setQuery] = useState(params.query);
  const [activeQuery, setActiveQuery] = useState(params.query);

  const { data: books, loading, error, execute } = useFindAllBooks();

  const createNewUrl = (newParams: { query?: string; genres?: Genre[]; page?: number }) => {
    return generateEncodedUrl('/books/search', {
      query: newParams.query || activeQuery,
      genres: (newParams.genres || selectedGenres).map((selectedGenre) => selectedGenre.name.toLocaleLowerCase()),
      page: (newParams.page !== undefined ? newParams.page : page) + 1
    });
  };

  const toggleGenre = (genre: Genre) => {
    const newSelectedGenres = [...selectedGenres];
    const index = newSelectedGenres.indexOf(genre);
    if (index > -1) {
      newSelectedGenres.splice(index, 1);
    } else {
      newSelectedGenres.push(genre);
    }
    setQuery(activeQuery);
    navigate(createNewUrl({ genres: newSelectedGenres }), { replace: true });
  };

  const search = () => {
    navigate(createNewUrl({ query }));
  };

  const onPageChange = (newPage) => {
    navigate(createNewUrl({ page: newPage }), { replace: true });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  useEffect(() => {
    execute({ query: activeQuery, genres: selectedGenres, page, limit: 18 });
  }, [selectedGenres, activeQuery, page, execute]);

  useEffect(() => {
    if (params.query !== activeQuery) {
      setActiveQuery(params.query);
      setQuery(params.query);
    }
    if (params.genres !== selectedGenres.map((genre) => genre.name.toLocaleLowerCase())) {
      setSelectedGenres(
        params.genres.map((paramGenre) =>
          data.genres.find((genre) => genre.name.toLocaleLowerCase() === paramGenre.toLocaleLowerCase())
        )
      );
    }
    if (params.page !== page) {
      setPage(params.page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    document.title = 'Search | Books | BookBrowser';
  }, []);

  return (
    <Container maxWidth="lg">
      <Breadcrumb className="mb-1">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/books' }}>
          Books
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Search</Breadcrumb.Item>
      </Breadcrumb>
      <Heading as="h1" className="mb-3">
        Search Books
      </Heading>
      <InputGroup className="mb-5">
        <FormControl
          size="lg"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button variant="primary" onClick={search}>
          Search
        </Button>
      </InputGroup>
      <Heading as="h2" className="mb-4">
        Genres
      </Heading>
      <div className="d-flex flex-wrap mb-4">
        {data &&
          data.genres.map((genre) => (
            <ButtonGroup key={genre.id}>
              <ToggleButton
                type="checkbox"
                variant="outline-primary"
                className="me-2 mb-2"
                checked={selectedGenres.includes(genre)}
                value={genre.id}
                onClick={() => toggleGenre(genre)}
              >
                {genre.name}
              </ToggleButton>
            </ButtonGroup>
          ))}
      </div>
      {loading && <Loading />}
      {error && <ErrorAlert uiMessage="Unable to load content" error={error} />}
      {books && (
        <div>
          <Heading as="h2">{books.items.length > 0 ? 'Results' : 'No Results'}</Heading>
          <BookList books={books.items} />
          <Pagination page={page} totalPages={books.totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </Container>
  );
};

export default SearchBookPage;
