import React, { ReactNode } from 'react';
import Message from '../message';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const RegisterSuccess = ({ footer }: {
  footer?: ReactNode
}) => {
  return (
    <Message
      variant="success"
      title="Thank for registering"
      lead="A verification email has been sent to your email address."
    >
      {footer}
    </Message>
  );
}

export default RegisterSuccess;