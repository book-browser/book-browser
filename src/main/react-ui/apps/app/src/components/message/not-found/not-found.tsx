import Message from 'components/message/message';
import React from 'react';

export const NotFound = () => (
  <Message variant="danger" title="404: page not found" lead="The page you requested does not exist" />
);
