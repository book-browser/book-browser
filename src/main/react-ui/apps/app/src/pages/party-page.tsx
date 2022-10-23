/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import { PartyDetails } from 'components/party-details/party-details';
import { useGetPartyById } from 'hooks/party.hook';
import React, { useEffect } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Party } from 'types/party';

const PartyPageHeader = ({ party }: { party: Party }) => {
  return (
    <div className="d-flex align-items-start">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Party</Breadcrumb.Item>
        <Breadcrumb.Item active>{party.fullName}</Breadcrumb.Item>
      </Breadcrumb>
      <Button as={Link as any} to={`/parties/${party.id}/edit`} className="ms-auto" variant="primary">
        <EditIcon /> Edit
      </Button>
    </div>
  );
};

const PartyPageContent = () => {
  const { data: party, execute, loading, error } = useGetPartyById();
  const { id } = useParams();

  useEffect(() => {
    execute(Number(id));
  }, [id, execute]);

  useEffect(() => {
    if (party) {
      document.title = `${party.fullName} | BookBrowser`;
    } else {
      document.title = 'BookBrowser';
    }
  }, [party]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (party) {
    return (
      <>
        <PartyPageHeader party={party} />
        <PartyDetails party={party} />
      </>
    );
  }
  return null;
};

export const PartyPage = () => {
  return (
    <Container maxWidth="lg">
      <PartyPageContent />
    </Container>
  );
};

export default PartyPage;
