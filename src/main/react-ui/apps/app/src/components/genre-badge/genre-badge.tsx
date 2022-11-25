import React from 'react';
import { Genre } from 'types/genre';
import { Genre as GenreConst } from 'consts';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

export interface IGenreBadgeProps {
  genre: Genre;
  variant?: 'series' | 'book';
}

const GenreBadge = ({ genre, variant = 'book' }: IGenreBadgeProps) => {
  return (
    <Badge
      as={Link}
      to={`/${variant}/search?genres=${genre.name.toLowerCase().replace(' ', '+')}`}
      className="border m-1"
    >
      {GenreConst[genre.name].label}
    </Badge>
  );
};

export default GenreBadge;
