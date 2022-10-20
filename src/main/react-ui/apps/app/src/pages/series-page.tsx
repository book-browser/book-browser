/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Loading from 'components/loading/loading';
import { NotFound } from 'components/message/not-found/not-found';
import { SomethingWentWrong } from 'components/message/something-went-wrong/something-went-wrong';
import SeriesDetails from 'components/series-details/series-details';
import { useGetById } from 'hooks/series.hook';
import React, { useEffect } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { ApiError } from 'types/api-error';
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
  const apiError = error?.name === 'ApiError' && (error as ApiError);
  const notFound = apiError?.status === 404;

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
    if (notFound) {
      return <NotFound />;
    }
    return <SomethingWentWrong error={error} />;
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
