import React, { ReactNode } from 'react';
import Message from '../message';
import { Link } from 'react-router-dom'; 

export interface VerificationLinkExpiredProps {
  children?: ReactNode 
}

const VerificationLinkExpired = ({
  children
}: VerificationLinkExpiredProps) => {
  return (
    <Message
      variant="warning"
      title="Email verification link expired"
      lead={(
        <>
          <p>Looks like the verification link has expired. Not to worry, we can send the link again.</p>
        </>
      )} 
    >
      {children}
    </Message>
  )
}

export default VerificationLinkExpired;