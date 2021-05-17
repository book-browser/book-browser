import React, { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export interface ConfirmationProps {
  variant: Variant,
  title: string,
  children: ReactNode,
}

export const Confirmation = ({ variant, title, children }: ConfirmationProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <CheckCircleOutlineIcon className="mr-2 text-success" />
          {title}
        </Card.Title>
        {children}
      </Card.Body>
    </Card>
  )
}