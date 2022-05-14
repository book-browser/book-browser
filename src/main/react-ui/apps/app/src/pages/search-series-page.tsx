import { Container } from '@material-ui/core';
import SeriesList from 'components/series-list/series-list';
import { useReferenceData } from 'hooks/reference-data.hook';
import { useFindAll } from 'hooks/series.hook';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  Form,
  FormControl,
  InputGroup,
  ToggleButton,
} from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Genre } from 'types/genre';
import { ReferenceData } from 'types/reference-data';
import { Series } from 'types/series';
import { generateEncodedUrl, parseParams } from 'utils/location-utils';
import * as yup from 'yup';

interface SearchSeriesPageParams {
  query: string;
  genres: string[];
  sort: string;
}

const readParams = (location: Location, referenceData: ReferenceData) => {
  const genreNames = referenceData.genres.map((genre) =>
    genre.name.toLocaleLowerCase()
  );

  const schema = yup.object().shape({
    query: yup.string().default(''),
    genres: yup.array(
      yup.string().test({
        test: (val) => genreNames.includes(val.toLocaleLowerCase()),
      })
    ),
    sort: yup.string().oneOf(['id', 'title', 'lastUpdated']).default('id'),
  }) as yup.SchemaOf<SearchSeriesPageParams>;

  return parseParams(location, schema) as SearchSeriesPageParams;
};

const SearchSeriesPage = () => {
  const { data } = useReferenceData();
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => readParams(location, data), [location, data]);

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    params.genres.map((paramGenre) =>
      data.genres.find(
        (genre) =>
          genre.name.toLocaleLowerCase() === paramGenre.toLocaleLowerCase()
      )
    )
  );
  const [query, setQuery] = useState(params.query);
  const [activeQuery, setActiveQuery] = useState(params.query);
  const [activeSort, setActiveSort] = useState(params.sort);

  const { data: seriesList, execute } = useFindAll();

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

  const changeParams = ({
    genres,
    query: newQuery,
    sort,
  }: {
    query?: string;
    genres?: Genre[];
    sort?: string;
  }) => {
    history.push(
      generateEncodedUrl('/series/search', {
        query: newQuery || query || activeQuery,
        genres: (genres ? genres : selectedGenres).map((genre) =>
          genre.name.toLocaleLowerCase()
        ),
        sort: sort ? (sort !== 'id' ? sort : '') : activeSort,
      })
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeParams({ query });
    }
  };

  useEffect(() => {
    execute({
      query: activeQuery,
      genres: selectedGenres,
      sort: activeSort as keyof Series,
      order: activeSort === 'lastUpdated' ? 'desc' : 'asc',
    });
  }, [selectedGenres, activeQuery, activeSort, execute]);

  useEffect(() => {
    if (params.query !== activeQuery) {
      setActiveQuery(params.query);
      setQuery(params.query);
    }
    if (
      params.genres !==
      selectedGenres.map((genre) => genre.name.toLocaleLowerCase())
    ) {
      setSelectedGenres(
        params.genres.map((paramGenre) =>
          data.genres.find(
            (genre) =>
              genre.name.toLocaleLowerCase() === paramGenre.toLocaleLowerCase()
          )
        )
      );
    }
    if (params.sort !== activeSort) {
      setActiveSort(params.sort);
    }
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

      <h2 className="mb-3">Search Series</h2>

      <InputGroup className="mb-5">
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

      <h3 className="mb-4">Genres</h3>
      <div className="d-flex flex-wrap mb-4">
        {data &&
          data.genres.map((genre) => (
            <ButtonGroup toggle key={genre.id}>
              <ToggleButton
                type="checkbox"
                variant="outline-primary"
                className="mr-2 mb-2"
                checked={selectedGenres.includes(genre)}
                value={genre.id}
                onChange={() => toggleGenre(genre)}
              >
                {genre.name}
              </ToggleButton>
            </ButtonGroup>
          ))}
      </div>

      <h3 className="mb-4">Filter</h3>
      <Form.Group controlId="sort-select">
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

      <h3 className="mb-4">Results</h3>
      {seriesList && <SeriesList seriesList={seriesList.items} />}
    </Container>
  );
};

export default SearchSeriesPage;
