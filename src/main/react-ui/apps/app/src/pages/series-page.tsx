import { Container } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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

const SeriesPageHeader = ({ series }: {
  series: Series
}) => {
  return (
    <div className="d-flex align-items-start">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/home"}}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/series"}}>Series</Breadcrumb.Item>
        <Breadcrumb.Item active>{series.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Button as={Link} to={`/series/${series.id}/edit`} className="ml-auto" variant="primary"><EditIcon /> Edit</Button>
    </div>
  );
}

const SeriesPageContent = () => {
  const { data: series, execute, loading, error } = useGetById();
  const { id } = useParams();
  const apiError = error?.name === 'ApiError' && error as ApiError;
  const notFound = apiError?.status === 404 ;

  useEffect(() => {
    execute(id);
  }, [id]);

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
    return <SomethingWentWrong error={error}/>;
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
    <Container maxWidth="md">
      <SeriesPageContent />
    </Container>
  );
}

export default SeriesPage;