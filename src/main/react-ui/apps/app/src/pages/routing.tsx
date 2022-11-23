import ScrollToTop from 'components/scroll-to-top/scroll-to-top';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import BookListPage from './book-list-page';
import BookPage from './book-page';
import CreateBookPage from './create-book-page';
import EditBookPage from './edit-book-page';
import EditEpisodePage from './edit-episode-page';
import EditPartyPage from './edit-party-page';
import EditSeriesPage from './edit-series-page';
import EpisodePage from './episode-page';
import Header from './header';
import Homepage from './homepage';
import LoginPage from './login-page';
import NewEpisodePage from './new-episode-page';
import NewSeriesPage from './new-series-page';
import NotFoundPage from './not-found-page';
import PartyPage from './party-page';
import PublisherPartyPage from './publisher-party-page';
import RandomBookPage from './random-book-page';
import RecentBookPage from './recent-book-page';
import RecentlyUpdatedSeriesPage from './recently-updated-series-page';
import RegisterPage from './register-page';
import ResendVerificationEmailPage from './resend-verification-email-page';
import SearchBookPage from './search-book-page';
import SearchResultPage from './search-result-page';
import SearchSeriesPage from './search-series-page';
import SeriesEpisodesPage from './series-episodes-page';
import SeriesListPage from './series-list-page';
import SeriesPage from './series-page';
import UpcomingBookPage from './upcoming-book-page';
import UsernameRecoveryPage from './username-recovery-page';
import VerifyUserPage from './verify-user-page';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="books">
          <Route index element={<BookListPage />}></Route>
          <Route path="new" element={<CreateBookPage />}></Route>
          <Route path="search" element={<SearchBookPage />}></Route>
          <Route path=":id">
            <Route index element={<BookPage />}></Route>
            <Route path="edit" element={<EditBookPage />}></Route>
          </Route>
        </Route>

        <Route path="series">
          <Route index element={<SeriesListPage />}></Route>
          <Route path="recently-updated" element={<RecentlyUpdatedSeriesPage />}></Route>
          <Route path="search" element={<SearchSeriesPage />}></Route>
          <Route path="new" element={<NewSeriesPage />}></Route>
          <Route path=":id">
            <Route index element={<SeriesPage />}></Route>
            <Route path="episodes" element={<SeriesEpisodesPage />}></Route>
            <Route path="edit" element={<EditSeriesPage />}></Route>
          </Route>
        </Route>

        <Route path="episodes">
          <Route path="new" element={<NewEpisodePage />}></Route>
          <Route path=":id">
            <Route index element={<EpisodePage />}></Route>
            <Route path="edit" element={<EditEpisodePage />}></Route>
          </Route>
        </Route>

        <Route path="parties">
          <Route path=":id">
            <Route index element={<PartyPage />}></Route>
            <Route path="edit" element={<EditPartyPage />}></Route>
          </Route>
        </Route>

        <Route path="publishers">
          <Route path=":id">
            <Route index element={<PublisherPartyPage />}></Route>
          </Route>
        </Route>

        <Route path="/search" element={<SearchResultPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/user/verify/:token" element={<VerifyUserPage />}></Route>
        <Route path="/verify/resend" element={<ResendVerificationEmailPage />}></Route>
        <Route path="/username/recover" element={<UsernameRecoveryPage />}></Route>
        <Route path="/random" element={<RandomBookPage />}></Route>
        <Route path="/recent" element={<RecentBookPage />}></Route>
        <Route path="/coming-soon" element={<UpcomingBookPage />}></Route>
        <Route path="/home" element={<Navigate to="/" replace />}></Route>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
