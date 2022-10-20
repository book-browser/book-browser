import { CircularProgress, Container } from '@mui/material';
import { useSave } from 'hooks/series.hook';
import React, { useEffect, useState } from 'react';
import { Series } from 'types/series';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Nav } from 'react-bootstrap';
import { ErrorAlert } from 'components/error/error-alert';
import SeriesForm from 'components/form/series-form/series-form';
import Message from 'components/message/message';
import { usePrompt } from 'hooks/router.hook';

const NewSeriesForm = ({
  loading,
  onChange,
  onSubmit,
  error
}: {
  loading: boolean;
  onChange: () => void;
  onSubmit: (series: Series) => void;
  error: Error;
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
      <h1 className="heading-main">Add a New Series</h1>
      <SeriesForm
        onChange={onChange}
        onSubmit={onSubmit}
        footer={
          <div>
            {error && <ErrorAlert uiMessage="Something went wrong. Unable to add your entry." error={error} />}
            {!loading && (
              <Button variant="primary" type="submit">
                Submit
              </Button>
            )}
            {loading && (
              <Button variant="primary" type="submit" disabled>
                Submitting <CircularProgress color="secondary" size={'15px'} />
              </Button>
            )}
          </div>
        }
      />
    </div>
  );
};

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

const NewSeriesPageContent = () => {
  const { execute, data, loading, error } = useSave();
  const [saved, setSaved] = useState(true);
  usePrompt('Are you sure to leave (all changes will be lost)?', !saved);

  const onChange = () => {
    setSaved(false);
  };

  const onSubmit = (newSeries: Series) => {
    execute(newSeries);
  };

  if (!data) {
    return <NewSeriesForm loading={loading} onChange={onChange} onSubmit={onSubmit} error={error} />;
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
