import { CircularProgress, Container } from '@mui/material';
import { ErrorAlert } from 'components/error/error-alert';
import ErrorListButton from 'components/form/form/error-list-button/error-list-button';
import SeriesForm from 'components/form/series-form/series-form';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import Heading from 'components/navigation/heading/heading';
import { FormikErrors } from 'formik';
import { usePrompt } from 'hooks/router.hook';
import { useGetById, useSave } from 'hooks/series.hook';
import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SeriesForm as SeriesFormType } from 'types/series';

const EditSeriesPageContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: loadedSeries, execute: load, loading: loadingSeries, error: loadError } = useGetById();
  const { data: savedSeries, execute: save, loading: savingSeries, error: saveError } = useSave();

  const [series, setSeries] = useState<SeriesFormType>();
  const [saved, setSaved] = useState(true);
  const [errors, setErrors] = useState<FormikErrors<SeriesFormType>>({});

  usePrompt('Are you sure to leave (all changes will be lost)?', !saved);

  const onChange = (changedSeries: SeriesFormType, valid, errors: FormikErrors<SeriesFormType>) => {
    if (changedSeries !== series) {
      setSeries(changedSeries);
      setSaved(false);
      setErrors(errors);
    }
  };

  const onSubmit = (changedSeries: SeriesFormType) => {
    save(changedSeries);
  };

  const reset = () => {
    setSeries(savedSeries || loadedSeries);
  };

  const cancel = () => {
    navigate(`/series/${series.id}`);
  };

  useEffect(() => {
    if (series) {
      document.title = `Edit ${(savedSeries || loadedSeries).title}${saved ? '' : '*'} | SeriesBrowser`;
    } else {
      document.title = 'Edit | SeriesBrowser';
    }
  }, [series, savedSeries, loadedSeries, saved]);

  useEffect(() => {
    load(Number(id));
  }, [id, load]);

  useEffect(() => {
    if (loadedSeries) {
      setSeries(loadedSeries);
    }
  }, [loadedSeries]);

  useEffect(() => {
    if (savedSeries) {
      setSeries({ ...series, ...savedSeries });
      setSaved(true);
    }
  }, [savedSeries]);

  if (loadingSeries) {
    return <Loading />;
  }
  if (loadError) {
    return <ErrorMessage error={loadError} />;
  }
  if (series) {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
            Series
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/series/${series.id}` }}>
            {(savedSeries || loadedSeries)?.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <Heading as="h1">Edit Series</Heading>
        <SeriesForm
          value={series}
          onChange={onChange}
          onSubmit={onSubmit}
          footer={
            <div>
              {saveError && (
                <ErrorAlert uiMessage="Something went wrong. Unable to save this entry." error={saveError} />
              )}
              {!saveError && savedSeries && (
                <Alert variant="success" className="mb-2">
                  Changes successfully saved
                </Alert>
              )}
              <div className="d-flex">
                <Button className="me-2" variant="secondary" disabled={savingSeries} onClick={cancel}>
                  Cancel
                </Button>
                <Button className="me-auto" variant="secondary" disabled={savingSeries} onClick={reset}>
                  Reset
                </Button>
                <ErrorListButton errors={errors} />
                <Button variant="primary" type="submit" disabled={savingSeries}>
                  {!savingSeries && <span>Save</span>}
                  {savingSeries && (
                    <span>
                      Saving <CircularProgress color="secondary" size="0.95rem" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          }
        />
      </div>
    );
  }
  return null;
};

const EditSeriesPage = () => {
  return (
    <Container maxWidth="md" className="mt-3">
      <EditSeriesPageContent />
    </Container>
  );
};

export default EditSeriesPage;
