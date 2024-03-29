import { Container } from '@mui/material';
import { rest } from 'msw';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Book } from 'types/book';
import { Genre } from 'types/genre';
import { Party } from 'types/party';
import { Role } from 'types/role';
import { BookForm } from './book-form';

export default { title: 'Forms/Book Form' };

const roles: Role[] = [
  {
    title: 'Author',
    value: 0
  }
];

const genres: Genre[] = [
  {
    id: 1,
    name: 'Drama'
  },
  {
    id: 2,
    name: 'Fantasy'
  }
];

const people: Party[] = [
  {
    id: 0,
    fullName: 'Jim Jimmerson'
  },
  {
    id: 1,
    fullName: 'John Smith'
  }
];

const mockStore = configureStore()({
  referenceDataReducer: {
    data: {
      roles,
      genres
    },
    loading: false,
    error: null
  }
});

const msw = [
  rest.post('/api/party/search', (req, res, ctx) => {
    const { query } = req.body as { query: string };
    return res(ctx.json(people.filter((item) => item.fullName.toUpperCase().includes(query.toUpperCase()))));
  }),
  rest.get('/api/book/0/thumbnail', async (_req, res, ctx) => {
    const image = await fetch(
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/00044796-5145-452f-a81c-756835192c26/de3mu5i-a1d68913-e84e-4501-b940-39391eb5cf25.jpg/v1/fill/w_1051,h_760,q_70,strp/late_for_work_by_oyasumi75_de3mu5i-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTM4OCIsInBhdGgiOiJcL2ZcLzAwMDQ0Nzk2LTUxNDUtNDUyZi1hODFjLTc1NjgzNTE5MmMyNlwvZGUzbXU1aS1hMWQ2ODkxMy1lODRlLTQ1MDEtYjk0MC0zOTM5MWViNWNmMjUuanBnIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.nSE431xbHW0lUUceMl6JpQPZSM2eP-oRGhG17NIcUU4'
    ).then((imgRes) => imgRes.arrayBuffer());
    return res(
      ctx.set('Content-Length', image.byteLength.toString()),
      ctx.set('Content-Type', 'image/png'),
      ctx.body(image)
    );
  })
];

export const NoData = () => {
  return (
    <Provider store={mockStore}>
      <Container maxWidth="md">
        <Card>
          <BookForm />
        </Card>
      </Container>
    </Provider>
  );
};

NoData.parameters = {
  msw
};

export const ExistingData = () => {
  const book: Book = {
    id: 0,
    title: 'This is a title',
    description: 'This is a description',
    thumbnail: null,
    creators: [{ partyId: 0, fullName: 'Jim Jimmerson', role: '0' }],
    genres: [{ id: 1, name: 'Drama' }],
    links: [{ id: 1, description: 'Homepage', url: 'https://www.google.com' }]
  };

  return (
    <Provider store={mockStore}>
      <Container maxWidth="md">
        <Card>
          <BookForm initialValue={book} />
        </Card>
      </Container>
    </Provider>
  );
};

ExistingData.parameters = {
  msw
};
