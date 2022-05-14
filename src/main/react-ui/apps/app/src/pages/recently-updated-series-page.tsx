import { Container } from '@material-ui/core';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import Pagination from 'components/pagination/pagination';
import SeriesList from 'components/series-list/series-list';
import { useFindAll as useFindAllSeries } from 'hooks/series.hook';
import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { generateEncodedUrl, parseParams } from 'utils/location-utils';
import * as yup from 'yup';

interface RecentlyUpdatedSeriesPageParams {
  page: number;
}

const schema = yup.object().shape({
  page: yup
    .number()
    .min(0)
    .transform((val) => val - 1)
    .default(0)
}) as yup.SchemaOf<RecentlyUpdatedSeriesPageParams>;

const RecentlyUpdatedSeriesPageContent = () => {
  const history = useHistory();
  const location: Location = useLocation();
  const params = parseParams(location, schema);

  const [page, setPage] = useState(params.page);

  const { data: seriesList, loading, error, execute: findAll } = useFindAllSeries();

  const onPageChange = (newPage) => {
    history.push(generateEncodedUrl('series', { page: newPage + 1 }));
  };

  useEffect(() => {
    if (params.page !== page) {
      setPage(params.page);
    }
  }, [params, page]);

  useEffect(() => {
    findAll({
      page,
      order: 'desc',
      sort: 'lastUpdated',
      limit: 48
    });
  }, [page, findAll]);

  useEffect(() => {
    setPage(params.page);
  }, [params.page]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorAlert uiMessage="Unable to load content" error={error} />;
  } else if (seriesList) {
    return (
      <div>
        <SeriesList seriesList={seriesList.items} />
        <Pagination page={page} totalPages={seriesList.totalPages} onPageChange={onPageChange} />
      </div>
    );
  }

  return null;
};

export const RecentlyUpdatedSeries = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumb className="mb-1">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
          Series
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Recently Updated</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Recently Updated</h2>
      <RecentlyUpdatedSeriesPageContent />
    </Container>
  );
};

export default RecentlyUpdatedSeries;