import { CircularProgress, Container } from '@mui/material';
import { ErrorAlert } from 'components/error/error-alert';
import { useResendVerificationEmail, useUser } from 'hooks/user.hook';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ResendVerificationEmailPage = () => {
  const { user } = useUser();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { execute, executed, loading, error } = useResendVerificationEmail();

  useEffect(() => {
    document.title = 'Resend Verification Email | BookBrowser';
  }, []);

  useEffect(() => {
    if (user) {
      if (user.verified) {
        navigate('/');
      } else {
        setEmail(user.email);
      }
    }
  }, [user, navigate]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <Card.Body>
          <Card.Title>Resend Verification Email</Card.Title>
          <p>Please enter the email address that you want to resend the verificaton email to.</p>
          <div>
            <Form.Group controlId="email-input">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" name="email-input" value={email} onChange={onChange} disabled={!!user} />
            </Form.Group>
          </div>
          <div className="mb-3">
            {!loading && (
              <Button className="w-100" variant="primary" disabled={email.length === 0} onClick={() => execute(email)}>
                Resend
              </Button>
            )}
            {loading && (
              <Button className="w-100" variant="primary" disabled>
                Resending <CircularProgress color="inherit" size="0.95rem" />
              </Button>
            )}
          </div>
          <Form.Text className="mb-3" muted>
            If you still have not received the email, please check your "Spam" or "Trash" folder in your email.
          </Form.Text>
          <div className="text-center mb-3">
            <Link to="/home">Return Home</Link>
            {user && (
              <>
                <span> | </span>
                <Link to="/#">Change Email</Link>
              </>
            )}
          </div>
          {error && <ErrorAlert uiMessage="Something went wrong. Unable to process your request." error={error} />}
          {executed && !error && <Alert variant="success">Verification Email Resent!</Alert>}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ResendVerificationEmailPage;
