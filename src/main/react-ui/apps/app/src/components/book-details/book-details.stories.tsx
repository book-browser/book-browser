import React from 'react';
import { Book } from 'types/book';
import { BookDetails } from './book-details';
import { BrowserRouter } from 'react-router-dom';

export default { title: 'Book Details' };

export const SimpleBookDetails = () => {
  const book: Book = {
    id: 85,
    title: 'Batman: Last Knight on Earth',
    description: "Bruce Wayne wakes up in Arkham Asylum. Young. Sane. And he was never Batman. So begins this sprawling tale of the Dark Knight as he embarks on a quest through a devastated DC landscape featuring a massive cast of familiar faces from the DC Universe. As he tries to piece together the mystery of his past, he must unravel the cause of this terrible future and track down the unspeakable force that destroyed the world as he knew it.",
    creators: [
      {
        id: 0,
        fullName: 'Scott Snyder',
        role: 'Author',
      },
      {
        id: 1,
        fullName: 'Greg Capullo',
        role: 'Illustrator',
      }
    ]
  };

  return (
    <div className="w-75">
      <BrowserRouter>
        <BookDetails book={book} />
      </BrowserRouter>
    </div>
  );
};
