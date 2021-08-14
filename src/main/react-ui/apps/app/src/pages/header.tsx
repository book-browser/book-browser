import HeaderModal, { HeaderModalTab } from 'components/modals/header-modal';
import { useLogout, useUser } from 'hooks/user.hook';
import React, { useState } from 'react';
import { Alert, Button, Navbar } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

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

  return (
    <>
      <Navbar>
        <Navbar.Brand>BookBrowser</Navbar.Brand>
        {!(['/login', '/login/', '/register', '/register/', '/username/recover', 'username/recover/'].includes(location.pathname)) && (
          <div className="ml-auto">
            {!user && <Button variant="primary" className="mr-1" onClick={() => openModal('login')}>Login</Button>}
            {!user && <Button variant="primary" onClick={() => openModal('register')}>Register</Button>}
            {user && <Button variant="primary" onClick={logout}>Logout</Button>}
          </div>
        )}
        
        <HeaderModal defaultTab={defaultTab} show={modalVisible} onHide={() => setModalVisible(false)} />
      </Navbar>
      {user && !user.verified && !['/verify/resend', '/verify/resend/'].includes(location.pathname) && (
        <Alert variant="warning" dismissible show={verificationAlertVisible} onClose={() => setVerificationAlertVisible(false)}>
          Unverified account. Please check your email for a verification email.
          <Link to="/verify/resend" className="float-right">Resend Email</Link>
        </Alert>
      )}
    </>
  )
};

export default Header;