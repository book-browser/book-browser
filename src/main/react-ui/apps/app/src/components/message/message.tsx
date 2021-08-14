import React, { ReactNode } from 'react';
import { Variant } from 'react-bootstrap/esm/types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
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
            {variant === 'info' && <InfoIcon className="text-info" fontSize="inherit" /> }
            {variant === 'warning' && <WarningIcon className="text-warning" fontSize="inherit" /> }
        </div>
      <h1>
        {title}
      </h1>
      <div className="lead mb-4">{lead}</div>
    </div>
    {children}
  </div>
  )
}

export default Message;