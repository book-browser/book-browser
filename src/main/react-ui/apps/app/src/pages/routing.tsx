import { Container } from '@material-ui/core';
import { NotFound } from 'components/message/not-found/not-found';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { BookPage } from './book-page';
import { CreateBookPage } from './create-book-page';
import EditBookPage from './edit-book-page';
import Header from './header';
import LoginPage from './login-page';
import RandomBookPage from './random-book-page';
import RegisterPage from './register-page';
import ResendVerificationEmailPage from './resend-verification-email-page';
import SearchPage from './search-page';
import UsernameRecoveryPage from './username-recovery-page';
import VerifyUserPage from './verify-user-page';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/book/:id">
          <BookPage />
        </Route>
        <Route exact path="/book/:id/edit">
          <EditBookPage />
        </Route>
        <Route exact path="/search">
          <SearchPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/user/verify/:token">
          <VerifyUserPage />
        </Route>
        <Route exact path="/verify/resend">
          <ResendVerificationEmailPage />
        </Route>
        <Route exact path="/username/recover">
          <UsernameRecoveryPage />
        </Route>
        <Route exact path="/random">
          <RandomBookPage />
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