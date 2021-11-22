import GenreBadge from 'components/genre-badge/genre-badge';
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'types/book';
import './book-details.scss';

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
        <h1 className="heading-main">{book.title}</h1>
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
            <div>{`Release Date: ${book.releaseDate.toLocaleDateString() || '-'}`}</div>
          </div>
          <hr />
          <div className="mb-2">
            Genres: 
            {book.genres.map((genre) => <GenreBadge key={genre.id} genre={genre} />)}
          </div>
        </div>

        {book.links.length > 0 && (
          <>
            <span><strong>Relevant Links</strong></span>
            <div className="mb-4">
              {book.links.map((link) => (
                <div key={link.url}>
                  <Link to={{ pathname: link.url }} target="_blank">{link.description}</Link>
                </div>
              ))}
            </div>
          </>
        )}
        
      </div>
    </div>
  )
}