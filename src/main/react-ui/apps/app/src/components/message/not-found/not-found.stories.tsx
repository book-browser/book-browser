import { Container } from '@material-ui/core';
import React from 'react';
import { Card } from 'react-bootstrap';
import { NotFound } from './not-found';

export default { title: 'Messages/Not Found' };

export const NotFoundExample = () => {
	return (
		<Container>
			<Card>
				<NotFound />
			</Card>
		</Container>
	);
};