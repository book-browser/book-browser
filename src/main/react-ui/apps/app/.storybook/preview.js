import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { initializeWorker, mswDecorator } from 'msw-storybook-addon';
import '../src/styles.scss';

initializeWorker();
addDecorator(withKnobs);
addDecorator(mswDecorator);
