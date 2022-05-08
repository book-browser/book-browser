import BookCard from 'components/book-card/book-card';
import { CardList } from 'components/card-list/card-list';
import React from 'react';
import { Book } from 'types/book';
import './book-list.scss';

export interface BookListProps {
  books: Book[];
}

const BookList = ({ books }: BookListProps) => {
  return (
    <CardList>
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </CardList>
  );
};

export default BookList;
