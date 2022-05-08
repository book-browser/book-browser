import React from 'react';
import SeriesCard from './series-card';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { SERIES_EXAMPLE } from 'fixtures/series.fixture';

export default { title: 'Components/Cards/Series Card' };

export const Example = () => {
  return (
    <BrowserRouter>
      <SeriesCard series={SERIES_EXAMPLE} />
    </BrowserRouter>
  );
}

const msw = [
  rest.get('/api/series/0/thumbnail', async (req, res, ctx) => {
    const image = await fetch('https://cdn.imagecomics.com/assets/i/releases/76910/invincible-compendium-vol-3-tp_474738fa22.jpg').then((res) =>
      res.arrayBuffer(),
    )
    return res(
      ctx.set('Content-Length', image.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpg'),
      ctx.body(image),
    )
  })
];
