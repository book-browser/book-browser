import Container from '@mui/material/Container';
import LetterControl from 'components/controls/letter-control/letter-control';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import Heading from 'components/navigation/heading/heading';
import Pagination from 'components/pagination/pagination';
import SeriesList from 'components/series-list/series-list';
import { LetterEnum } from 'enum';
import { useGetPublisherByIdOrUrlName } from 'hooks/party.hook';
import { useFindAllSeries } from 'hooks/series.hook';
import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  convertEnumStringToUrlEnumString,
  convertUrlEnumStringToEnumString,
  generateEncodedUrl,
  parseParams
} from 'utils/location-utils';
import * as yup from 'yup';

type PublisherSeriesPageParams = {
  page: number;
  letter: LetterEnum;
};

const schema = yup.object().shape({
  page: yup
    .number()
    .min(0)
    .transform((val) => val - 1)
    .default(0),
  letter: yup
    .mixed<LetterEnum>()
    .oneOf(Object.values(LetterEnum))
    .transform(convertUrlEnumStringToEnumString)
    .default(LetterEnum.ALL)
}) as yup.SchemaOf<PublisherSeriesPageParams>;

export const PublisherSeriesPageContent = () => {
  const { data: publisher, execute, error: publisherError, loading: loadingPublisher } = useGetPublisherByIdOrUrlName();
  const { data: series, execute: findAllSeries, error: seriesError, loading: loadingSeries } = useFindAllSeries();

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = parseParams(location, schema);

  const [criteria, setCriteria] = useState<PublisherSeriesPageParams>(params);

  const changeParams = (newParams: Partial<PublisherSeriesPageParams>) => {
    const resolvedPage = newParams.page !== undefined ? newParams.page : criteria.page;
    const letter = newParams.letter || criteria.letter;
    navigate(
      generateEncodedUrl(`/publishers/${publisher.urlName}/series`, {
        page: resolvedPage > 0 ? resolvedPage + 1 : undefined,
        letter: letter !== LetterEnum.ALL ? convertEnumStringToUrlEnumString(letter) : undefined
      })
    );
  };

  useEffect(() => {
    if (JSON.stringify(params) !== JSON.stringify(criteria)) {
      setCriteria(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    execute(id);
  }, [id, execute]);

  useEffect(() => {
    if (publisher) {
      findAllSeries({
        publisher: publisher.urlName,
        page: criteria.page,
        limit: 24,
        titleStartsWith: criteria.letter,
        sort: 'title',
        order: 'asc'
      });
    }
  }, [publisher, criteria, findAllSeries]);

  useEffect(() => {
    if (publisher) {
      document.title = `${publisher.fullName} Series | BookBrowser`;
    } else {
      document.title = 'Series | BookBrowser';
    }
  }, [publisher]);

  if (publisherError) {
    return <ErrorMessage error={publisherError} />;
  }

  if (loadingPublisher) {
    return <Loading />;
  }

  if (publisher) {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Publisher</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/publishers/${publisher.fullName}` }}>
            {publisher.fullName}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Series</Breadcrumb.Item>
        </Breadcrumb>
        <Heading as="h1">{`${publisher.fullName} Series`}</Heading>
        {seriesError && <ErrorAlert error={seriesError} />}
        {loadingSeries && <Loading />}
        {series && (
          <>
            <LetterControl
              value={criteria.letter}
              onChange={(_name, value) => changeParams({ letter: value, page: 0 })}
            />
            <SeriesList seriesList={series.items} />
            <Pagination
              page={criteria.page}
              totalPages={series.totalPages}
              onPageChange={(newPage) => changeParams({ page: newPage })}
            />
          </>
        )}
      </>
    );
  }
  return null;
};

export const PublisherSeriesPage = () => {
  return (
    <Container maxWidth="lg">
      <PublisherSeriesPageContent />
    </Container>
  );
};

export default PublisherSeriesPage;
