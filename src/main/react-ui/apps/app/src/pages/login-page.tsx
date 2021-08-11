import { Container } from '@material-ui/core';
import { ErrorAlert } from 'components/error/error-alert';
import LoginForm from 'components/form/login-form/login-form';
import { useLogin, useUser } from 'hooks/user.hook';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { LoginRequest } from 'types/login-request';
import { Link, useHistory } from 'react-router-dom'; 

const LoginPage = () => {
  const { user } = useUser();
  const { execute: login, error } = useLogin();
  const [valid, setValid] = useState(false);

  const history = useHistory();

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  const onChange = (_data: LoginRequest, valid: boolean) => {
    setValid(valid);
  }

  useEffect(() => {
    document.title = 'Login';
  }, []);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user]);

  return (
    <Container maxWidth="sm" className="mt-3">
      <Card>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <LoginForm
            onChange={onChange}
            onSubmit={onSubmit}
            footer={
              <div>
                {error && <ErrorAlert error={error} />}
                <Button variant="primary" type="submit" disabled={!valid}>Login</Button>
                <p className="text-center"><Link to="/register">Forgot Password?</Link></p>
                <p className="text-center">Don't have an account? <Link to="/register">Register</Link></p>
              </div>
            }
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;