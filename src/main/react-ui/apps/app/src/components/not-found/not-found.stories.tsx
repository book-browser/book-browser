import { Container } from '@material-ui/core';
import React from 'react';
import { NotFound } from './not-found';

export default { title: 'Not Found' };

export const NotFoundExample = () => {
	return (
		<Container maxWidth="sm" className="ml-0">
			<NotFound />
		</Container>
	);
};