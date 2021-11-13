import { Container } from '@material-ui/core';
import BookCard from 'components/book-card/book-card';
import { useSearch } from 'hooks/book.hook';
import { useReferenceData } from 'hooks/reference-data.hook';
import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, ButtonGroup, FormControl, InputGroup, ToggleButton } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { Genre } from 'types/genre';

const SearchPage = () => {
  const { data } = useReferenceData();
  const location = useLocation();
  const params = parse(location.search);
  
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [query, setQuery] = useState('');

  const { data: books, execute } = useSearch();

  useEffect(() => { 
    if (data) {
      if (params.genres) {
        const genreStrings = typeof params.genres == 'string' ? [params.genres.toLocaleLowerCase()] : params.genres.map((genre) => genre.toLocaleLowerCase());
        const genres = data.genres.filter((genre) => genreStrings.includes(genre.name.toLocaleLowerCase()));
        setSelectedGenres(genres);
      }
    }
  }, [data, location])

  useEffect(() => {
    if (params.query) {
      setQuery((typeof params.query == 'string' ? params.query : params.query[0]) || '');
    }
  }, [location]);

  const toggleGenre = (genre: Genre) => {
    const newSelectedGenres = [...selectedGenres];
    const index = newSelectedGenres.indexOf(genre);
    if (index > -1) {
      newSelectedGenres.splice(index, 1);
    } else {
      newSelectedGenres.push(genre);
    }
    setSelectedGenres(newSelectedGenres);
  }

  useEffect(() => {
    execute({ query, genres: selectedGenres });
  }, [selectedGenres, query]);

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
        <FormControl size="lg" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
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
