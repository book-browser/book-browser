import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { RegisterRequest } from 'types/register-request';
import RegisterForm from './register-form';

export default { title: 'Forms/Register Form' }

export const Example = () => {
  const [valid, setValid] = useState(false);

  const onChange = (_data: RegisterRequest, valid: boolean) => {
    setValid(valid);
  }

  const onSubmit = (data: RegisterRequest) => {
    window.alert(`Registering: ${JSON.stringify(data)}`)
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <Card.Body>
          <RegisterForm
            onChange={onChange}
            onSubmit={onSubmit}
            footer={
              <div>
                <Button variant="primary" type="submit" disabled={!valid}>Register</Button>
              </div>
            }
          />
        </Card.Body>
      </Card>
    </Container>
  );
}
