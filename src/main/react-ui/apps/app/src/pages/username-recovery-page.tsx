import { CircularProgress, Container } from '@material-ui/core';
import { ErrorAlert } from 'components/error/error-alert';
import { useSendUsernameEmail, useUser } from 'hooks/user.hook';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const UsernameRecoveryPage = () => {
  const { user } = useUser();
  const [email, setEmail] = useState('');
  const history = useHistory();
  const { execute, executed, loading, error } = useSendUsernameEmail();

  useEffect(() => {
    document.title = 'Recover Username';
  }, []);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user])

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <Card.Body>
          <Card.Title>Recover Username</Card.Title>
          <p>Please enter the email address that you want to send the username to.</p>
          <div>
            <Form.Group controlId="email-input">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                name="email-input"
                value={email}
                onChange={onChange}
                disabled={!!user}
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            {!loading && <Button className="w-100" variant="primary" disabled={email.length === 0} onClick={() => execute(email)}>Send</Button>}
            {loading && <Button className="w-100" variant="primary" disabled>Resending <CircularProgress color="inherit" size={"15px"} /></Button>}
          </div>
          <Form.Text className="mb-3" muted>
            If you still have not received the email, please check your "Spam" or "Trash" folder in your email.  
          </Form.Text>
          <div className="text-center mb-3">
            <Link to="/home">Return Home</Link>
          </div>
          {error && <ErrorAlert error={error} />}
          {executed && !error && <Alert variant="success">Username Email Sent!</Alert>}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default UsernameRecoveryPage;