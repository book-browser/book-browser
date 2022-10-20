import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Publisher } from 'types/publisher';
import LaunchIcon from '@mui/icons-material/Launch';

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
                <a href={publisher.url} target="_blank" rel="noreferrer">
                  <Button>
                    <LaunchIcon />
                  </Button>
                </a>
              </div>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default PublisherList;
