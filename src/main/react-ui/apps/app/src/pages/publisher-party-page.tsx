/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';
import PublisherPartyDetails from 'components/details/publisher-party-details/publisher-party-details';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import { useGetPublisherByIdOrUrlName } from 'hooks/party.hook';
import { useFindAllSeries } from 'hooks/series.hook';
import React, { useEffect } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Party } from 'types/party';

const PublisherPartyPageHeader = ({ data }: { data: Party }) => {
  return (
    <div className="d-flex align-items-start">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Publishers</Breadcrumb.Item>
        <Breadcrumb.Item active>{data.fullName}</Breadcrumb.Item>
      </Breadcrumb>
      <Button as={Link as any} to={`/publisher/${data.urlName}/edit`} className="ms-auto" variant="primary">
        <EditIcon /> Edit
      </Button>
    </div>
  );
};

const PartyPageContent = () => {
  const { data, execute, loading, error } = useGetPublisherByIdOrUrlName();
  const { data: series, execute: findAllSeries, loading: loadingSeries, error: seriesError } = useFindAllSeries();

  const { id } = useParams();

  useEffect(() => {
    execute(id);
  }, [id, execute]);

  useEffect(() => {
    if (data) {
      findAllSeries({ publisher: data.urlName, limit: 18 });
    }
  }, [data, findAllSeries]);

  useEffect(() => {
    if (data) {
      document.title = `${data.fullName} | Publishers | BookBrowser`;
    } else {
      document.title = 'BookBrowser';
    }
  }, [data]);

  if (loading || loadingSeries) {
    return <Loading />;
  }
  if (error || seriesError) {
    return <ErrorMessage error={error || seriesError} />;
  }
  if (data && series) {
    return (
      <>
        <PublisherPartyPageHeader data={data} />
        <PublisherPartyDetails party={data} series={series.items} totalSeries={series.totalElements} />
      </>
    );
  }
  return null;
};

const PublisherPartyPage = () => {
  return (
    <Container maxWidth="lg">
      <PartyPageContent />
    </Container>
  );
};

export default PublisherPartyPage;
