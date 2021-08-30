import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'types/book';
import './book-card.scss';

export interface IBookCardProps {
  book: Book
}

const BookCard = ({
  book
}: IBookCardProps) => {
  return (
      <div className="m-2 book-card">
        <Link to={`/book/${book.id}`}>
          <img className="book-card-img" src={`/api/book/${book.id}/thumbnail`} />
        </Link>

        <div className="book-card-title">
          <Link to={`/book/${book.id}`}>{book.title}</Link>
        </div>
      </div>
  )
}

export default BookCard;