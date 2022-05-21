import React from 'react';
import RegisterSuccess from './register-success';
import { BrowserRouter, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { Card, Nav } from 'react-bootstrap';

export default { title: 'Messages/Register Success' }

export const Example = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Card>
          <RegisterSuccess
            footer={(    
              <Nav className="justify-content-between">
                <Nav.Item>
                  <Nav.Link as={Link} to="/home">Return Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          />
        </Card>
      </Container>
    </BrowserRouter>
  )
}