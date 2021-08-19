import React from 'react';
import { Genre } from 'types/genre';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

export interface IGenreBadgeProps {
  genre: Genre
}

const GenreBadge = ({
  genre
}: IGenreBadgeProps) => {
  return (
    <Badge as={Link} to={`/book/genre/${genre.name.toLowerCase().replace(' ', '-')}`} className="border m-1">
      {genre.name}
    </Badge>
  )
}

export default GenreBadge;