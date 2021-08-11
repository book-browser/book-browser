import HeaderModal, { HeaderModalTab } from 'components/modals/header-modal';
import { useLogout, useUser } from 'hooks/user.hook';
import React, { useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { user } = useUser();
  const { execute: logout } = useLogout();
  const location = useLocation();

  const [modalVisible, setModalVisible] = useState(false);
  const [defaultTab, setDefaultTab] = useState<HeaderModalTab>('login');

  const openModal = (tab: HeaderModalTab) => {
    setDefaultTab(tab);
    setModalVisible(true)
  }

  return (
    <Navbar>
      <Navbar.Brand>BookBrowser</Navbar.Brand>
      {!(['/login', '/login/', '/register', '/register/'].includes(location.pathname)) && (
        <div className="ml-auto">
          {!user && <Button variant="primary" className="mr-1" onClick={() => openModal('login')}>Login</Button>}
          {!user && <Button variant="primary" onClick={() => openModal('register')}>Register</Button>}
          {user && <Button variant="primary" onClick={logout}>Logout</Button>}
        </div>
      )}

      <HeaderModal defaultTab={defaultTab} show={modalVisible} onHide={() => setModalVisible(false)} />
    </Navbar>
  )
};

export default Header;