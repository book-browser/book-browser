import React, { ReactNode } from 'react';
import Message from '../message';

const VerificationLinkResent = ({ children }: { children?: ReactNode }) => {
  return (
    <Message
      variant="info"
      title="Verification Link Resent"
      lead="Another email with a verification link to activate your account has been sent to your email address. The link will expire in 24 hours."
    >
      {children}
    </Message>
  );
};

export default VerificationLinkResent;
