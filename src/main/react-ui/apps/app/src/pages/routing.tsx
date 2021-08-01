import { Container } from '@material-ui/core';
import { NotFound } from 'components/not-found/not-found';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BookPage } from './book-page';
import { CreateBookPage } from './create-book-page';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/book/:id">
          <BookPage />
        </Route>
        <Route exact path="/">
          <CreateBookPage />
        </Route>
        <Route>
          <Container maxWidth="sm" className="mt-3">
            <NotFound />
          </Container>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}