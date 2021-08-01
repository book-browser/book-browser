import React from 'react';
import { Book } from 'types/book';
import { Link } from 'react-router-dom';
import './book-details.scss';
import { Card } from 'react-bootstrap';

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
          <p>{book.description}</p>
        </div>
      </div>
    </Card>
  )
}