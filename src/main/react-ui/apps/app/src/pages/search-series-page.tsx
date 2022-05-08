import { Container } from '@material-ui/core';
import SeriesList from 'components/series-list/series-list';
import { useReferenceData } from 'hooks/reference-data.hook';
import { useFindAll } from 'hooks/series.hook';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, Button, ButtonGroup, FormControl, InputGroup, ToggleButton } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Genre } from 'types/genre';
import { ReferenceData } from 'types/reference-data';
import { generateEncodedUrl, parseParams } from 'utils/location-utils';
import * as yup from 'yup';

interface SearchSeriesPageParams {
  query: string,
  genres: string[],
}

const readParams = (location: Location, referenceData: ReferenceData) => {
  const genreNames = referenceData.genres.map((genre) => genre.name.toLocaleLowerCase());

  const schema = yup.object().shape({
    query: yup.string().default(''),
    genres: yup.array(yup.string().test({
      test: (val) => genreNames.includes(val.toLocaleLowerCase())
    }))
  }) as yup.SchemaOf<SearchSeriesPageParams>;

  return parseParams(location, schema) as SearchSeriesPageParams;
};

const SearchSeriesPage = () => {
  const { data } = useReferenceData();
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => readParams(location, data), [location, data]);

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(params.genres.map((paramGenre) => data.genres.find((genre) => genre.name.toLocaleLowerCase() === paramGenre.toLocaleLowerCase())));
  const [query, setQuery] = useState(params.query);
  const [activeQuery, setActiveQuery] = useState(params.query);

  const { data: seriesList, execute } = useFindAll();

  const toggleGenre = (genre: Genre) => {
    const newSelectedGenres = [...selectedGenres];
    const index = newSelectedGenres.indexOf(genre);
    if (index > -1) {
      newSelectedGenres.splice(index, 1);
    } else {
      newSelectedGenres.push(genre);
    }
    setQuery(activeQuery);
    history.push(generateEncodedUrl('/series/search', { query: activeQuery, genres: newSelectedGenres.map((genre) => genre.name.toLocaleLowerCase()) }));
  }

  const search = () => {
    history.push(generateEncodedUrl('/series/search', { query, genres: selectedGenres.map((genre) => genre.name.toLocaleLowerCase()) }));
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      search();
    }
  }

  useEffect(() => {
    execute({ query: activeQuery, genres: selectedGenres });
  }, [selectedGenres, activeQuery, execute]);

  useEffect(() => {
    if (params.query !== activeQuery) {
      setActiveQuery(params.query);
      setQuery(params.query);
    }
    if (params.genres !== selectedGenres.map((genre) => genre.name.toLocaleLowerCase())) {
      setSelectedGenres(params.genres.map((paramGenre) => data.genres.find((genre) => genre.name.toLocaleLowerCase() === paramGenre.toLocaleLowerCase())));
    }
  }, [params]);

  useEffect(() => {
    document.title = 'Search | Series | BookBrowser';
  }, []);

  return (
    <Container maxWidth="lg">
      <Breadcrumb className="mb-1">
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/home"}}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/series"}}>Series</Breadcrumb.Item>
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
        <Button variant="primary" onClick={search}>Search</Button>
      </InputGroup>

      <h3 className="mb-4">Genres</h3>
      <div className="d-flex flex-wrap mb-4">
        {data && data.genres.map((genre) => (
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

      <h3 className="mb-4">Results</h3>
      {seriesList && <SeriesList seriesList={seriesList.items} />}
    </Container>
  )
};

export default SearchSeriesPage;
