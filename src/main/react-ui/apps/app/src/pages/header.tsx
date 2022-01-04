import HeaderModal, { HeaderModalTab } from 'components/modals/header-modal';
import SearchBar from 'components/search-bar/search-bar';
import { useLogout, useUser } from 'hooks/user.hook';
import React, { useState } from 'react';
import { Alert, Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const Header = () => {
  const { user } = useUser();
  const { execute: logout } = useLogout();
  const location = useLocation();

  const [modalVisible, setModalVisible] = useState(false);
  const [defaultTab, setDefaultTab] = useState<HeaderModalTab>('login');

  const [verificationAlertVisible, setVerificationAlertVisible] = useState(true);

  const openModal = (tab: HeaderModalTab) => {
    setDefaultTab(tab);
    setModalVisible(true)
  }

  const isAuthLocation = ['/login', '/login/', '/register', '/register/', '/username/recover', 'username/recover/'].includes(location.pathname);

  return (
    <div style={{ marginBottom: '80px' }}>
      <Navbar fixed="top" collapseOnSelect expand="md" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/home">BookBrowser</Navbar.Brand>
          <Navbar.Toggle className="mb-2" aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Browse" id="test">
                <div className="d-flex ml-3 mr-3">
                  <div>
                    <div className="pl-4 mb-2"><strong>Books</strong></div>
                    <NavDropdown.Item as={Link} to="/recent">Recent Releases</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/coming-soon" >Coming Soon</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/books" >All Books</NavDropdown.Item>
                  </div>
                  <div>
                    <div className="pl-4 mb-2"><strong>Series</strong></div>
                    <NavDropdown.Item as={Link} to="/series">All Series</NavDropdown.Item>
                  </div>
                </div>
                
              </NavDropdown>
              <Nav.Link as={Link} to="/random">Random</Nav.Link>
            </Nav>
            <SearchBar className="mr-2"/>
            <Nav>
              <Nav.Link as={Link} to="/search">Filter</Nav.Link>
            </Nav>
            {!user && (
              !isAuthLocation && (
                <>
                  <Button variant="nav" onClick={() => openModal('login')}>Login</Button>
                  <Button variant="nav" onClick={() => openModal('register')}>Register</Button>
                </>
              )
            )}
            {user && (
              <>
                <Nav>
                  <NavDropdown title={<AddIcon />} id="test">
                    <NavDropdown.Item as={Link} to="/book/new">New Book</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/series/new">New Series</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {!isAuthLocation && <Button variant="nav" onClick={logout}>Logout</Button>}
              </>
            )}
            
            <HeaderModal defaultTab={defaultTab} show={modalVisible} onHide={() => setModalVisible(false)} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {user && !user.verified && !['/verify/resend', '/verify/resend/'].includes(location.pathname) && (
        <Alert variant="warning" dismissible show={verificationAlertVisible} onClose={() => setVerificationAlertVisible(false)}>
          Unverified account. Please check your email for a verification email.
          <Link to="/verify/resend" className="float-right">Resend Email</Link>
        </Alert>
      )}
    </div>
  )
};

export default Header;