import BookCard from 'components/book-card/book-card';
import React from 'react';
import { Book } from 'types/book';

export interface BookListProps {
  books: Book[]
} 

const BookList = ({ books }: BookListProps) => {
  return (
    <div className="d-flex flex-wrap mb-3">
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
}

export default BookList;