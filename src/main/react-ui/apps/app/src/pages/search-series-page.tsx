import { Container } from '@mui/material';
import Pagination from 'components/pagination/pagination';
import SeriesList from 'components/series-list/series-list';
import { useReferenceData } from 'hooks/reference-data.hook';
import { useFindAll } from 'hooks/series.hook';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, Button, ButtonGroup, Form, FormControl, InputGroup, ToggleButton } from 'react-bootstrap';
import { Link, useNavigate, useLocation, Location } from 'react-router-dom';
import { Genre } from 'types/genre';
import { ReferenceData } from 'types/reference-data';
import { Series } from 'types/series';
import { generateEncodedUrl, parseParams } from 'utils/location-utils';
import * as yup from 'yup';
import Loading from 'components/loading/loading';
import Heading from 'components/navigation/heading/heading';
import { ErrorAlert } from 'components/error/error-alert';

type SearchSeriesPageParams = {
  query: string;
  genres: string[];
  sort: string;
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
    sort: yup.string().oneOf(['id', 'title', 'lastUpdated']).default('id'),
    page: yup
      .number()
      .min(0)
      .transform((val) => val - 1)
      .default(0)
  }) as yup.SchemaOf<SearchSeriesPageParams>;

  return parseParams(location, schema);
};

const SearchSeriesPage = () => {
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
  const [activeSort, setActiveSort] = useState(params.sort);

  const { data: seriesList, loading, error, execute } = useFindAll();

  const toggleGenre = (genre: Genre) => {
    const newSelectedGenres = [...selectedGenres];
    const index = newSelectedGenres.indexOf(genre);
    if (index > -1) {
      newSelectedGenres.splice(index, 1);
    } else {
      newSelectedGenres.push(genre);
    }
    changeParams({ genres: newSelectedGenres });
  };

  const changeParams = (newParams: { query?: string; genres?: Genre[]; page?: number; sort?: string }) => {
    const sort = newParams.sort || activeSort;
    navigate(
      generateEncodedUrl('/series/search', {
        query: newParams.query || activeQuery,
        genres: (newParams.genres || selectedGenres).map((selectedGenre) => selectedGenre.name.toLocaleLowerCase()),
        page: (newParams.page !== undefined ? newParams.page : page) + 1,
        sort: sort !== 'id' ? sort : ''
      }),
      { replace: true }
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeParams({ query });
    }
  };

  const onPageChange = (newPage) => {
    changeParams({ page: newPage });
  };

  useEffect(() => {
    execute({
      query: activeQuery,
      genres: selectedGenres,
      sort: activeSort as keyof Series,
      order: activeSort === 'lastUpdated' ? 'desc' : 'asc',
      page,
      limit: 18
    });
  }, [selectedGenres, activeQuery, activeSort, page, execute]);

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
    if (params.sort !== activeSort) {
      setActiveSort(params.sort);
    }
    if (params.page !== page) {
      setPage(params.page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    document.title = 'Search | Series | BookBrowser';
  }, []);

  return (
    <Container maxWidth="lg">
      <Breadcrumb className="mb-1">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
          Series
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Search</Breadcrumb.Item>
      </Breadcrumb>

      <Heading as="h1" className="mb-3">
        Search Series
      </Heading>

      <InputGroup className="mb-3">
        <FormControl
          size="lg"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button variant="primary" onClick={() => changeParams({ query })}>
          Search
        </Button>
      </InputGroup>

      <Heading as="h2" className="mb-2">
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

      <Heading as="h2" className="mb-2">
        Filter
      </Heading>
      <Form.Group controlId="sort-select" className="mb-3">
        <Form.Label>Sort</Form.Label>
        <Form.Control
          as="select"
          style={{ width: '250px' }}
          value={activeSort}
          onChange={(e) => changeParams({ sort: e.target.value })}
        >
          <option value="id">Default</option>
          <option value="title">Title</option>
          <option value="lastUpdated">Last Updated</option>
        </Form.Control>
      </Form.Group>

      <Heading as="h2" className="mb-4">
        Results
      </Heading>
      {loading && <Loading />}
      {error && <ErrorAlert uiMessage="Unable to load content" error={error} />}
      {seriesList && (
        <div>
          <SeriesList seriesList={seriesList.items} />
          <Pagination page={page} totalPages={seriesList.totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </Container>
  );
};

export default SearchSeriesPage;
