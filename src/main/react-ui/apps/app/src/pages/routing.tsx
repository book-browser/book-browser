import { Container } from '@material-ui/core';
import { NotFound } from 'components/message/not-found/not-found';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { BookPage } from './book-page';
import { CreateBookPage } from './create-book-page';
import Header from './header';
import LoginPage from './login-page';
import RegisterPage from './register-page';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/book/:id">
          <BookPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
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