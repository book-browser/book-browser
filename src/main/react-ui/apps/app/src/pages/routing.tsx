import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CreateBookPage } from './create-book-page';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <CreateBookPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}