import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { Button } from 'react-bootstrap';

export default { title: 'Button' };

export const primary = () => (
  <Button>hello world</Button>
);