import React, { ReactNode } from 'react';
import { Variant } from 'react-bootstrap/esm/types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import './message.scss';

export interface MessageProps {
  variant: Variant,
  title: string,
  lead: ReactNode,
  children?: ReactNode,
}

const Message = ({ variant, title, lead, children }: MessageProps) => {
  return (
    <div className="ml-5 mb-5 mr-5">
      <div className="text-center">
        <div className="message-icon">
            {variant === 'success' && <CheckCircleIcon className="text-success" fontSize="inherit" /> }
            {variant === 'danger' && <ErrorIcon className="text-danger" fontSize="inherit" /> }
        </div>
      <h1>
        {title}
      </h1>
      <p className="lead mb-4">{lead}</p>
    </div>
    {children}
  </div>
  )
}

export default Message;