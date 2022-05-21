import { CircularProgress, Container } from '@mui/material';
import { DeepPartial } from '@reduxjs/toolkit';
import { ErrorAlert } from 'components/error/error-alert';
import { EpisodeForm } from 'components/form/episode-form/episode-form';
import SeriesForm from 'components/form/series-form/series-form';
import Message from 'components/message/message';
import { useCreateOrUpdateEpisode } from 'hooks/episode.hook';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Episode } from 'types/episode';
import { Series } from 'types/series';
import { parseParams } from 'utils/location-utils';
import * as yup from 'yup';

declare type NewEpisodePageParams = {
  title?: string;
  seriesId?: number;
  description?: string;
  releaseDate?: string;
};

const schema = yup.object().shape({
  title: yup.string().default(''),
  seriesId: yup.number(),
  description: yup.string().default(''),
  releaseDate: yup.string().default('')
}) as yup.SchemaOf<NewEpisodePageParams>;

const NewEpisodeForm = ({
  loading,
  onChange,
  onSubmit,
  error
}: {
  loading: boolean;
  onChange: () => void;
  onSubmit: (episode: DeepPartial<Episode>) => void;
  error: Error;
}) => {
  const location = useLocation();
  const params = parseParams(location, schema);
  const initialValue = {
    title: params.title,
    seriesId: params.seriesId,
    description: params.description,
    releaseDate:
      params.releaseDate && moment(params.releaseDate, 'YYYY-MM-DD', true).isValid()
        ? moment(params.releaseDate, 'YYYY-MM-DD').toDate()
        : undefined
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>New Episode</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="heading-main">Add a New Episode</h1>
      <EpisodeForm
        initialValue={initialValue}
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

const SuccessMessage = ({ episode }: { episode: Episode }) => {
  return (
    <Message variant="success" title="Success" lead="Your submission has been successful">
      <Nav className="justify-content-between">
        <Nav.Item>
          <Nav.Link as={Link} to="/home">
            Return Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/episodes/${episode.id}`}>
            View Episode
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Message>
  );
};

const NewEpisodePageContent = () => {
  const { execute, data, loading, error } = useCreateOrUpdateEpisode();
  const [saved, setSaved] = useState(true);

  const onChange = () => {
    setSaved(false);
  };

  const onSubmit = (newSeries: Series) => {
    execute(newSeries);
  };

  if (!data) {
    return (
      <>
        <NewEpisodeForm loading={loading} onChange={onChange} onSubmit={onSubmit} error={error} />
        {/* <Prompt
          when={!saved}
          message="Are you sure to leave (all changes will be lost)?"
        /> */}
      </>
    );
  } else {
    return <SuccessMessage episode={data} />;
  }
};

export const NewEpisodePage = () => {
  useEffect(() => {
    document.title = 'New Episode | BookBrowser';
  }, []);

  return (
    <Container maxWidth="md">
      <NewEpisodePageContent />
    </Container>
  );
};

export default NewEpisodePage;
