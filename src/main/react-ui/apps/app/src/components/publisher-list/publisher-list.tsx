import ExternalLink from 'components/navigation/external-link/external-link';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Publisher } from 'types/publisher';

export type PublisherListProps = {
  publishers: Publisher[];
};

export const PublisherList = ({ publishers }: PublisherListProps) => {
  return (
    <ListGroup className="mt-2">
      {publishers.map((publisher) => (
        <ListGroup.Item key={publisher.partyId} className="bg-light">
          <div className="d-flex justify-content-start align-items-baseline">
            <Link to={`/parties/${publisher.partyId}`}>
              <strong>{publisher.fullName}</strong>
            </Link>
            {publisher && (
              <div className="ms-auto">
                <ExternalLink href={publisher.url}>publisher.url</ExternalLink>
              </div>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default PublisherList;
