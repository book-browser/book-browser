import React from 'react';
import { Book } from 'types/book';
import { Link } from 'react-router-dom';
import './book-details.scss';
import { Card } from 'react-bootstrap';
import GenreBadge from 'components/genre-badge/genre-badge';

interface BookProps {
  book: Book
}

export const BookDetails = ({
  book
}: BookProps) => {
  return (
    <Card>
      <div className="book-details">
        <img className="book-details-thumbnail" src={`/api/book/${book.id}/thumbnail`} />
        <div>
          <h2>{book.title}</h2>
          <p>
            {book.creators.map((creator, index) => (
              <span key={creator.id}>
                <Link to={`/creator/${creator.id}`}>{creator.fullName}</Link>
                {index !== book.creators.length - 1 && ', '}
              </span>
            ))}
          </p>
          <div className="mb-2">
            Genres: 
            {book.genres.map((genre) => <GenreBadge key={genre.id} genre={genre} />)}
          </div>
          <p>{book.description}</p>
        </div>
      </div>
    </Card>
  )
}