import { Container } from '@material-ui/core';
import React from 'react';
import Message from './message';

export default { title: 'Message' };

export const MessageVariants = () => {
	return (
		<div>
			<Container maxWidth="md" className="ml-0">
				<Message variant="success" title="Success" lead="This is a success confirmation!" />
			</Container>

			<Container maxWidth="md" className="ml-0">
				<Message variant="danger" title="Error/Danger" lead="This is a danger confirmation!"/>
			</Container>
		</div>
	)
};