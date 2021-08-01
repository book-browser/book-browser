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
        <Route path="/">
          <CreateBookPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}