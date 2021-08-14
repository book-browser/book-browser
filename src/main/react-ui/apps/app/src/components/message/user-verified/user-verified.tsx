import React from 'react';
import Message from '../message';
import { Link } from 'react-router-dom'; 

const UserVerified = () => {
  return (
    <Message
      variant="success"
      title="Account Verified"
      lead={(
        <>
          <p>Thank you for verifying your account</p>
          <Link to="/home">Return Home</Link>
        </>
      )} 
    />
  )
}

export default UserVerified;