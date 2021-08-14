import { Container } from '@material-ui/core';
import React from 'react';
import Message from './message';

export default { title: 'Message' };

export const Variants = () => {
	return (
		<div>
			<Container maxWidth="md" className="ml-0">
				<Message variant="success" title="Success" lead="This is a success message!" />
			</Container>

			<Container maxWidth="md" className="ml-0">
				<Message variant="danger" title="Error/Danger" lead="This is a danger message!"/>
			</Container>

			<Container maxWidth="md" className="ml-0">
				<Message variant="info" title="Info" lead="This is a info message!"/>
			</Container>

			<Container maxWidth="md" className="ml-0">
				<Message variant="warning" title="Warning" lead="This is a warning message!"/>
			</Container>
		</div>
	)
};