import React from 'react';
import { Confirmation } from './confirmation';

export default { title: 'Confirmation' };

export const SimpleConfirmation = () => {
  
  return <Confirmation variant="success" title="Success" ><p>Your submission has been successful!</p></Confirmation>
};