import HeaderModal, { HeaderModalTab } from 'components/modals/header-modal';
import SearchBar from 'components/search-bar/search-bar';
import { useLogout, useUser } from 'hooks/user.hook';
import React, { useState } from 'react';
import { Alert, Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Home from '@mui/icons-material/Home';
import Shuffle from '@mui/icons-material/Shuffle';
import Menu from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import './header.scss';
import classNames from 'classnames';

const Header = () => {
  const { user } = useUser();
  const { execute: logout } = useLogout();
  const location = useLocation();

  const [modalVisible, setModalVisible] = useState(false);
  const [defaultTab, setDefaultTab] = useState<HeaderModalTab>('login');

  const [verificationAlertVisible, setVerificationAlertVisible] = useState(true);

  const openModal = (tab: HeaderModalTab) => {
    setDefaultTab(tab);
    setModalVisible(true);
  };

  const isAuthLocation = [
    '/login',
    '/login/',
    '/register',
    '/register/',
    '/username/recover',
    'username/recover/'
  ].includes(location.pathname);

  return (
    <div style={{ marginBottom: '5rem' }}>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/home">
            BookBrowser
          </Navbar.Brand>
          <Navbar.Toggle className="mb-2" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="mobile-search-bar">
              <SearchBar className="me-2" />
            </div>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home" active={['/home', '/'].includes(location.pathname)}>
                <Home className="mb-1 me-1" />
                <span>Home</span>
              </Nav.Link>
              <NavDropdown
                active={[
                  '/books',
                  '/books/search',
                  '/recent',
                  '/coming-soon',
                  '/series/search',
                  '/series/recently-updated',
                  'series'
                ].includes(location.pathname)}
                title={
                  <>
                    <Menu className="mb-1 me-1" />
                    <span>Browse</span>
                  </>
                }
                id="test"
                className="multiline-navbar-dropdown"
              >
                <div className="d-flex ms-3 me-3">
                  <div>
                    <div className="pl-4 mb-1">
                      <strong>Books</strong>
                    </div>
                    <NavDropdown.Item as={Link} to="/books/search">
                      Book Search
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/recent">
                      Recent Releases
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/coming-soon">
                      Coming Soon
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/books">
                      All Books
                    </NavDropdown.Item>
                  </div>
                  <div>
                    <div className="pl-4 mb-1">
                      <strong>Series</strong>
                    </div>
                    <NavDropdown.Item as={Link} to="/series/search">
                      Series Search
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/series/recently-updated">
                      Recently Updated
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/series">
                      All Series
                    </NavDropdown.Item>
                  </div>
                </div>
              </NavDropdown>
              <Nav.Link as={Link} to="/random">
                <Shuffle className="mb-1 me-1" />
                <span>Random</span>
              </Nav.Link>
            </Nav>
            <SearchBar className="me-2" />
            <Nav>
              <Nav.Link as={Link} to="/search">
                Filter
              </Nav.Link>
            </Nav>
            {!user && !isAuthLocation && (
              <>
                <Button variant="nav" className="me-2" onClick={() => openModal('login')}>
                  <LoginIcon className="mb-1" /> <span>Login</span>
                </Button>
                <Button variant="nav" onClick={() => openModal('register')}>
                  <AppRegistrationIcon className="mb-1" /> <span>Register</span>
                </Button>
              </>
            )}
            {user && (
              <>
                <Nav>
                  <NavDropdown title={<AddIcon />} id="test">
                    <NavDropdown.Item as={Link} to="/books/new">
                      New Book
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/series/new">
                      New Series
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {!isAuthLocation && (
                  <Button variant="nav" onClick={logout}>
                    Logout
                  </Button>
                )}
              </>
            )}

            <HeaderModal defaultTab={defaultTab} show={modalVisible} onHide={() => setModalVisible(false)} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {user && !user.verified && !['/verify/resend', '/verify/resend/'].includes(location.pathname) && (
        <Alert
          variant="warning"
          dismissible
          show={verificationAlertVisible}
          onClose={() => setVerificationAlertVisible(false)}
        >
          Unverified account. Please check your email for a verification email.
          <Link to="/verify/resend" className="float-end">
            Resend Email
          </Link>
        </Alert>
      )}
    </div>
  );
};

export default Header;
