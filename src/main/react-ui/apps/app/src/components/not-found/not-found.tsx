import { Confirmation } from 'components/confirmation/confirmation';
import React from 'react';

export const NotFound = () => (
  <Confirmation variant="danger" title="404: page not found">
    the page you requested does not exist
  </Confirmation>
);