import { CircularProgress, Container } from '@mui/material';
import { useSave } from 'hooks/series.hook';
import React, { useEffect, useState } from 'react';
import { Series, SeriesForm as SeriesFormType } from 'types/series';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Nav } from 'react-bootstrap';
import { ErrorAlert } from 'components/error/error-alert';
import SeriesForm, { SeriesFormProps } from 'components/form/series-form/series-form';
import Message from 'components/message/message';
import { usePrompt } from 'hooks/router.hook';
import Heading from 'components/navigation/heading/heading';
import { FormikErrors } from 'formik';
import ErrorListButton from 'components/form/form/error-list-button/error-list-button';

const SuccessMessage = ({ series }: { series: Series }) => {
  return (
    <Message variant="success" title="Success" lead="Your submission has been successful">
      <Nav className="justify-content-between">
        <Nav.Item>
          <Nav.Link as={Link} to="/home">
            Return Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/series/${series.id}`}>
            View Series
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Message>
  );
};

const NewSeriesForm = ({
  error,
  loading,
  formErrors,
  onChange,
  onSubmit,
  cancel
}: {
  loading: boolean;
  error: Error;
  formErrors: FormikErrors<Series>;
  onChange: SeriesFormProps['onChange'];
  onSubmit: SeriesFormProps['onSubmit'];
  cancel: () => void;
}) => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
          Series
        </Breadcrumb.Item>
        <Breadcrumb.Item active>New Series</Breadcrumb.Item>
      </Breadcrumb>
      <Heading as="h1">Add a New Series</Heading>
      <SeriesForm
        onChange={onChange}
        onSubmit={onSubmit}
        footer={
          <div>
            {error && <ErrorAlert uiMessage="Something went wrong. Unable to add your entry." error={error} />}
            <div className="d-flex">
              <Button className="me-auto" variant="secondary" disabled={loading} onClick={cancel}>
                Cancel
              </Button>
              <ErrorListButton errors={formErrors} />
              <Button variant="primary" type="submit" disabled={loading}>
                {!loading ? (
                  'Submit'
                ) : (
                  <span>
                    Submitting <CircularProgress color="secondary" size="0.95rem" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

const NewSeriesPageContent = () => {
  const { execute, data, loading, error } = useSave();
  const [saved, setSaved] = useState(true);
  usePrompt('Are you sure to leave (all changes will be lost)?', !saved);
  const [errors, setErrors] = useState<FormikErrors<SeriesFormType>>({});
  const navigate = useNavigate();

  const onChange = (data: SeriesFormType, _valid, errors: FormikErrors<SeriesFormType>) => {
    setSaved(false);
    setErrors(errors);
  };

  const onSubmit = (newSeries: SeriesFormType) => {
    execute(newSeries);
  };

  const cancel = () => {
    navigate('/home');
  };

  useEffect(() => {
    if (data) {
      setSaved(true);
    }
  }, [data]);

  if (!data) {
    return (
      <NewSeriesForm
        loading={loading}
        error={error}
        formErrors={errors}
        onChange={onChange}
        onSubmit={onSubmit}
        cancel={cancel}
      />
    );
  } else {
    return <SuccessMessage series={data} />;
  }
};

const NewSeriesPage = () => {
  useEffect(() => {
    document.title = 'New Series | BookBrowser';
  }, []);

  return (
    <Container maxWidth="md">
      <NewSeriesPageContent />
    </Container>
  );
};

export default NewSeriesPage;
