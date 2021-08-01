import React, { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/Error';

export interface ConfirmationProps {
  variant: Variant,
  title: string,
  children: ReactNode,
}

export const Confirmation = ({ variant, title, children }: ConfirmationProps) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className="d-flex align-items-center">
          {variant === 'success' && <CheckCircleOutlineIcon className="mr-1 text-success" /> }
          {variant === 'danger' && <ErrorIcon className="mr-1 text-danger" /> }
          {title}
        </Card.Title>
        {children}
      </Card.Body>
    </Card>
  )
}