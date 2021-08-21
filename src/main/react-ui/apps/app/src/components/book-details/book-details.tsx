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
    <div className="book-details">
      <img className="book-details-thumbnail" src={`/api/book/${book.id}/thumbnail`} />
      <div className="flex-grow-1">
        <h2>{book.title}</h2>
        <p>
          {book.creators.map((creator, index) => (
            <span key={creator.id}>
              <Link to={`/creator/${creator.id}`}>{creator.fullName}</Link>
              {index !== book.creators.length - 1 && ', '}
            </span>
          ))}
        </p>
        
        {book.description.split('\n').map((part, index) => <p key={index}>{part}</p>)}
      </div>
      <div className="side">
        <span><strong>Details</strong></span>
        <div className="mb-4">
          <div className="mb-2">
            Genres: 
            {book.genres.map((genre) => <GenreBadge key={genre.id} genre={genre} />)}
          </div>
        </div>

        <span><strong>Relevant Links</strong></span>
        <div className="mb-4">
          {book.links.map((link) => (
            <div>
              <Link to={link.url}>{link.description}</Link>
            </div>
          ))}
        </div>
        
      </div>
    </div>
    
  )
}