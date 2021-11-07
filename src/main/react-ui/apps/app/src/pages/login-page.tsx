import { CircularProgress, Container } from '@material-ui/core';
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
  const { execute: login, error, loading } = useLogin();
  const [valid, setValid] = useState(false);

  const history = useHistory();

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  const onChange = (_data: LoginRequest, valid: boolean) => {
    setValid(valid);
  }

  useEffect(() => {
    document.title = 'Login | BookBrowser';
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
                {error && <ErrorAlert uiMessage="Something went wrong. Unable to login." error={error} />}
                {!loading && <Button variant="primary" type="submit" disabled={!valid}>Login</Button>}
                {loading && <Button variant="primary" type="submit" disabled>Loading <CircularProgress color="secondary" size={"15px"} /></Button>}

                <p className="text-center"><Link to="/username/recover">Forgot Username?</Link></p>
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