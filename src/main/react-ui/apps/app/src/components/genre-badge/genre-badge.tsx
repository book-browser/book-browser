import React from 'react';
import { Genre } from 'types/genre';
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
      to={`/${variant}/search?genres=${genre.name
        .toLowerCase()
        .replace(' ', '+')}`}
      className="border m-1"
    >
      {genre.name}
    </Badge>
  );
};

export default GenreBadge;
