import { Container } from '@material-ui/core';
import React from 'react';
import { Confirmation } from './confirmation';

export default { title: 'Confirmation' };

export const ConfirmationVariants = () => {
	return (
		<div>
			<Container maxWidth="sm" className="ml-0">
				<Confirmation variant="success" title="Success">
					<p>This is a success confirmation!</p>
				</Confirmation>
			</Container>

			<Container maxWidth="sm" className="ml-0">
				<Confirmation variant="danger" title="Error/Danger">
					<p>This is a danger confirmation!</p>
				</Confirmation>
			</Container>
		</div>
	)
};