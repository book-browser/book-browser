import { BOOK_EXAMPLE, BOOK_LONG_TITLE } from 'fixtures/book.fixture';
import { rest } from 'msw';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BookCard from './book-card';

export default { title: 'Components/Cards/Book Card' };

export const Example = () => {
  return (
    <BrowserRouter>
      <BookCard book={BOOK_EXAMPLE} />
    </BrowserRouter>
  );
}

const msw = [
  rest.get('/api/book/0/thumbnail', async (req, res, ctx) => {
    const image = await fetch('https://d30womf5coomej.cloudfront.net/sa/58/997d6546-35ae-439e-b5e8-f1fe62715203_z.jpg').then((res) =>
      res.arrayBuffer(),
    )
    return res(
      ctx.set('Content-Length', image.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpg'),
      ctx.body(image),
    )
  })  
];

Example.parameters = {
  msw,
}

