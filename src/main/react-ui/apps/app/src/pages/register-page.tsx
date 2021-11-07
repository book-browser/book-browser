import { CircularProgress, Container } from '@material-ui/core';
import { ErrorAlert } from 'components/error/error-alert';
import RegisterForm from 'components/form/register-form/register-form';
import RegisterSuccess from 'components/message/register-success/register-success';
import { useRegister, useUser } from 'hooks/user.hook';
import React, { useEffect, useState } from 'react';
import { Button, Card, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { RegisterRequest } from 'types/register-request';

const RegisterStep = ({ valid, loading, error, onChange, onSubmit }: {
  valid: boolean,
  loading: boolean,
  error?: Error
  onChange: (data: RegisterRequest, valid: boolean) => void
  onSubmit: (data: RegisterRequest) => void
}) => {
  return (
    <Container maxWidth="sm" className="mt-3">
      <Card>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <RegisterForm
            onChange={onChange}
            onSubmit={onSubmit}
            footer={
              <div>
                {error && <ErrorAlert uiMessage="Something went wrong. Unable to register." className="mb-3" error={error} />}
                {!loading && <Button className="mb-4" variant="primary" type="submit" disabled={!valid}>Register</Button>}
                {loading && <Button className="mb-4" variant="primary" type="submit" disabled>Registering <CircularProgress color="secondary" size={"15px"} /></Button>}
                
                <p className="text-center"><Link to="/username/recover">Forgot Username?</Link></p>
                <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
              </div>
            }
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

const RegisterSuccessStep = () => {
  return (
    <Container maxWidth="md" className="mt-3">
      <Card>
        <RegisterSuccess
          footer={(
            <>
            <p>
              Did not receive the email? <Link to="/user/">Send Again</Link>
            </p>
            <Nav className="justify-content-between">
              <Nav.Item>
                <Nav.Link as={Link} to="/home">Return Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </Nav.Item>
            </Nav>
          </>
          )}
        />
      </Card>
    </Container>
  );
}

const RegisterPage = () => {
  const { user } = useUser();
  const { execute: register, loading, executed, error } = useRegister();
  const [valid, setValid] = useState(false);

  const history = useHistory();

  const onSubmit = (data: RegisterRequest) => {
    register(data);
  };

  const onChange = (_data: RegisterRequest, valid: boolean) => {
    setValid(valid);
  }

  useEffect(() => {
    document.title = 'Register';
  }, []);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user]);

  return (
    <>
      {(!executed || error) && (
        <RegisterStep
          valid={valid}
          loading={loading}
          error={error}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      )}
      {executed && !error && <RegisterSuccessStep />}
    </>
  );
}

export default RegisterPage;