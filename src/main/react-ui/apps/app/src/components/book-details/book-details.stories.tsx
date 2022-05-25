import React from 'react';
import { Book } from 'types/book';
import { BookDetails } from './book-details';
import { BrowserRouter } from 'react-router-dom';
import { MULTIPLE_GENRES } from 'fixtures/genre.fixture';
import { rest } from 'msw';

export default { title: 'Book Details' };

const msw = [
  rest.get('/api/book/85/thumbnail', async (req, res, ctx) => {
    const image = await fetch('https://images-na.ssl-images-amazon.com/images/I/81ix2iemSzL.jpg').then((res) =>
      res.arrayBuffer()
    );
    return res(
      ctx.set('Content-Length', image.byteLength.toString()),
      ctx.set('Content-Type', 'image/png'),
      ctx.body(image)
    );
  })
];

export const SimpleBookDetails = () => {
  const book: Book = {
    id: 85,
    title: 'Batman: Last Knight on Earth',
    description:
      'Bruce Wayne wakes up in Arkham Asylum. Young.\nSane. And he was never Batman.\nSo begins this sprawling tale of the Dark Knight as he embarks on a quest through a devastated DC landscape featuring a massive cast of familiar faces from the DC Universe. As he tries to piece together the mystery of his past, he must unravel the cause of this terrible future and track down the unspeakable force that destroyed the world as he knew it...\nFrom the powerhouse creative team of writer Scott Snyder and artist Greg Capullo, the team that reinvented Batman from the emotional depths of “Court of Owls” to the bombastic power of DARK NIGHTS: METAL, DC Black Label is proud to present the bimonthly, three-issue miniseries BATMAN: LAST KNIGHT ON EARTH, published at DC’s standard comic trim size.\nThis could be the last Batman story ever told...',
    genres: MULTIPLE_GENRES,
    creators: [
      {
        id: 0,
        fullName: 'Scott Snyder',
        role: 'Author'
      },
      {
        id: 1,
        fullName: 'Greg Capullo',
        role: 'Illustrator'
      }
    ],
    links: [
      {
        id: 0,
        url: 'https://www.google.com',
        description: 'Homepage'
      }
    ]
  };

  return (
    <div>
      <BrowserRouter>
        <BookDetails book={book} />
      </BrowserRouter>
    </div>
  );
};

SimpleBookDetails.parameters = {
  msw
};
