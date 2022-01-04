import { Container } from '@material-ui/core';
import BookCard from 'components/book-card/book-card';
import { useSearch } from 'hooks/book.hook';
import { useReferenceData } from 'hooks/reference-data.hook';
import React, { useEffect, useMemo, useState, KeyboardEvent } from 'react';
import { Breadcrumb, Button, ButtonGroup, FormControl, InputGroup, ToggleButton } from 'react-bootstrap';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Genre } from 'types/genre';
import * as yup from 'yup';
import { parseParams } from 'utils/location-utils';
import { ReferenceData } from 'types/reference-data';

interface SearchPageParams {
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
  }) as yup.SchemaOf<SearchPageParams>;

  return parseParams(location, schema) as SearchPageParams;
};

const SearchPage = () => {
  const { data } = useReferenceData();
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(() => readParams(location, data), [location, data]);

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(params.genres.map((paramGenre) => data.genres.find((genre) => genre.name.toLocaleLowerCase() === paramGenre.toLocaleLowerCase())));
  const [query, setQuery] = useState(params.query);
  const [activeQuery, setActiveQuery] = useState(params.query);

  const { data: books, execute } = useSearch();

  const createNewUrl = (newQuery, newGenres) => {
    let url = '/search?'
    if (query.length > 0) {
      url = `${url}query=${newQuery}&`;
    }
    if (newGenres.length > 0) {
      newGenres.forEach((selectedGenre) => url = `${url}genres=${selectedGenre.name.toLocaleLowerCase()}&`);
    }
    return url.substring(0, url.length - 1);
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
    history.push(createNewUrl(activeQuery, newSelectedGenres));
  }

  const search = () => {
    history.push(createNewUrl(query, selectedGenres));
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      search();
    }
  }

  useEffect(() => {
    execute({ query: activeQuery, genres: selectedGenres });
  }, [selectedGenres, activeQuery]);

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
    document.title = 'Search | BookBrowser';
  }, []);

  return (
    <Container maxWidth="lg">
      <Breadcrumb className="mb-1">
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/home"}}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Search</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="mb-3">Search</h2>
      
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
      <div className="d-flex flex-wrap mb-4">
        {books && books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </div>
    </Container>
  )
};

export default SearchPage;
