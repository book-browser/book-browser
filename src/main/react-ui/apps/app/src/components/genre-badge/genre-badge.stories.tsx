import { GENRE_EXAMPLE, MULTIPLE_GENRES } from 'fixtures/genre.fixture';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GenreBadge from './genre-badge';

export default { title: 'Genre Badge' }

export const Example = () => {
  return (
    <BrowserRouter>
      <GenreBadge genre={GENRE_EXAMPLE} />
    </BrowserRouter>
  )
}

export const Multiple = () => {
  return (
    <BrowserRouter>
      {MULTIPLE_GENRES.map((genre) => <GenreBadge key={genre.id} genre={genre} />)}
    </BrowserRouter>
  )
}