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
      title="Thank you for registering"
      lead="An email with a verification link to activate your account has been sent to your email address. The link will expire in 24 hours."
    >
      {footer}
    </Message>
  );
}

export default RegisterSuccess;