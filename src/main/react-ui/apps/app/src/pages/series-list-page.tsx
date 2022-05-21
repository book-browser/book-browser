import { Container } from '@mui/material';
import SeriesList from 'components/series-list/series-list';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import Pagination from 'components/pagination/pagination';
import { useFindAll } from 'hooks/series.hook';
import { useReferenceData } from 'hooks/reference-data.hook';
import React, { useEffect, useMemo, useState } from 'react';
import { Breadcrumb, Button, ToggleButton } from 'react-bootstrap';
import * as yup from 'yup';
import { parseParams } from 'utils/location-utils';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ReferenceData } from 'types/reference-data';
import { Location } from 'history';

declare type SeriesListPageParams = {
  page: number;
  letter: string;
};

const readParams = (location: Location, referenceData: ReferenceData) => {
  const letterValues = referenceData.letters.map((letter) => letter.value);

  const schema = yup.object().shape({
    page: yup
      .number()
      .min(0)
      .transform((val) => val - 1)
      .default(0),
    letter: yup.string().oneOf(letterValues).default('ALL')
  }) as yup.SchemaOf<SeriesListPageParams>;

  return parseParams<SeriesListPageParams>(location, schema);
};

const SeriesListPageContent = () => {
  const { data: referenceData } = useReferenceData();
  const navigate = useNavigate();
  const location: Location = useLocation();
  const params = useMemo(() => readParams(location, referenceData), [location, referenceData]);

  const [page, setPage] = useState(params.page);
  const [letter, setLetter] = useState(params.letter);

  const { data: seriesList, loading, error, execute: findAll } = useFindAll();

  const onPageChange = (newPage) => {
    navigate(`/series${newPage > 0 ? `?page=${newPage + 1}` : ''}`);
  };

  useEffect(() => {
    if (params.letter !== letter) {
      setLetter(params.letter);
    }
    if (params.page !== page) {
      setPage(params.page);
    }
  }, [params]);

  useEffect(() => {
    const actualLetter = letter && referenceData.letters.find(({ value }) => value === letter);
    findAll({ titleStartsWith: actualLetter, page, order: 'asc', sort: 'title', limit: 48 });
  }, [page, letter]);

  useEffect(() => {
    setPage(params.page);
  }, [params.page]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorAlert uiMessage="Unable to load content" error={error} />;
  } else if (seriesList) {
    return (
      <>
        <div className="d-flex flex-wrap mb-3">
          {referenceData.letters.map((currLetter) => (
            <ToggleButton
              key={currLetter.value}
              value={currLetter.value}
              checked={currLetter.value === letter}
              className="me-2 mb-2"
              onClick={() => navigate(`/series?letter=${currLetter.value}`)}
            >
              {currLetter.label}
            </ToggleButton>
          ))}
        </div>
        <div className="mb-3">
          <SeriesList seriesList={seriesList.items} />
        </div>
        <Pagination page={page} totalPages={seriesList.totalPages} onPageChange={onPageChange} />
      </>
    );
  }

  return null;
};

const SeriesListPage = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Series</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="heading-main">Series</h1>
      <SeriesListPageContent />
    </Container>
  );
};

export default SeriesListPage;
