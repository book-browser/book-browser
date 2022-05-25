import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { LoginRequest } from 'types/login-request';
import LoginForm from './login-form';

export default { title: 'Forms/Login Form' };

export const Example = () => {
  const [valid, setValid] = useState(false);

  const onChange = (_data: LoginRequest, valid: boolean) => {
    setValid(valid);
  };

  const onSubmit = (data: LoginRequest) => {
    window.alert(`Logging in: ${JSON.stringify(data)}`);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <Card.Body>
          <LoginForm
            onChange={onChange}
            onSubmit={onSubmit}
            footer={
              <div>
                <Button variant="primary" type="submit" disabled={!valid}>
                  Login
                </Button>
              </div>
            }
          />
        </Card.Body>
      </Card>
    </Container>
  );
};
