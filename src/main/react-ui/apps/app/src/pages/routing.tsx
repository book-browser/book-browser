import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { BookPage } from './book-page';
import { CreateBookPage } from './create-book-page';
import EditBookPage from './edit-book-page';
import Header from './header';
import Homepage from './homepage';
import LoginPage from './login-page';
import NotFoundPage from './not-found-page';
import RandomBookPage from './random-book-page';
import RecentBookPage from './recent-book-page';
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
        <Route exact path="/recent">
          <RecentBookPage />
        </Route>
        <Route exact path="/book/new">
          <CreateBookPage />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}