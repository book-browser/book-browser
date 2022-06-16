import { Card } from 'components/card/card';
import { ImgLink } from 'components/img-link/img-link';
import React from 'react';
import { Book } from 'types/book';
import './book-card.scss';

export interface IBookCardProps {
  book: Book;
}

const BookCard = ({ book }: IBookCardProps) => {
  return (
    <Card className="book-card">
      <Card.Thumbnail>
        <ImgLink to={`/books/${book.id}`} imgProps={{ alt: 'thumbnail', src: `/api/book/${book.id}/thumbnail` }} />
      </Card.Thumbnail>
    </Card>
  );
};

export default BookCard;
