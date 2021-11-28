import BookCard from 'components/book-card/book-card';
import React from 'react';
import { Book } from 'types/book';
import './book-list.scss';

export interface BookListProps {
  books: Book[]
} 

const BookList = ({ books }: BookListProps) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
}

export default BookList;