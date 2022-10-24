/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import SeriesDetails from 'components/series-details/series-details';
import { useGetById } from 'hooks/series.hook';
import React, { useEffect } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Series } from 'types/series';

const SeriesPageHeader = ({ series }: { series: Series }) => {
  return (
    <div className="d-flex align-items-baseline mb-2">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
          Series
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{series.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Button as={Link as any} to={`/series/${series.id}/edit`} className="ms-auto" variant="primary">
        <EditIcon /> Edit
      </Button>
    </div>
  );
};

const SeriesPageContent = () => {
  const { data: series, execute, loading, error } = useGetById();
  const { id } = useParams();

  useEffect(() => {
    execute(Number(id));
  }, [id, execute]);

  useEffect(() => {
    if (series) {
      document.title = `${series.title} | BookBrowser`;
    } else {
      document.title = 'BookBrowser';
    }
  }, [series]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    <ErrorMessage error={error} />;
  }

  if (series) {
    return (
      <>
        <SeriesPageHeader series={series} />
        <SeriesDetails series={series} />
      </>
    );
  }
  return null;
};

const SeriesPage = () => {
  return (
    <Container maxWidth="lg">
      <SeriesPageContent />
    </Container>
  );
};

export default SeriesPage;
