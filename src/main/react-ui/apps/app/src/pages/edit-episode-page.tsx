import { CircularProgress, Container } from '@mui/material';
import { DeepPartial } from '@reduxjs/toolkit';
import { ErrorAlert } from 'components/error/error-alert';
import { EpisodeForm } from 'components/form/episode-form/episode-form';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import Heading from 'components/navigation/heading/heading';
import { useCreateOrUpdateEpisode, useGetEpisodeById } from 'hooks/episode.hook';
import { usePrompt } from 'hooks/router.hook';
import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Episode } from 'types/episode';

export const EditEpisodePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: loadedEpisode, execute: load, loading: loadingEpisode, error: loadError } = useGetEpisodeById();
  const { data: savedEpisode, execute: save, loading: savingEpisode, error: saveError } = useCreateOrUpdateEpisode();
  const [episode, setEpisode] = useState<DeepPartial<Episode>>();
  const [saved, setSaved] = useState(true);
  usePrompt('Are you sure to leave (all changes will be lost)?', !saved);

  const onChange = (changedEpisode: DeepPartial<Episode>) => {
    setEpisode(changedEpisode);
    setSaved(false);
  };

  const onSubmit = (episodeSubmission: DeepPartial<Episode>) => {
    save(episodeSubmission);
  };

  const reset = () => {
    setEpisode(savedEpisode || loadedEpisode);
  };

  const cancel = () => {
    navigate(`/episodes/${episode.id}`);
  };

  useEffect(() => {
    if (episode) {
      document.title = `Edit ${(savedEpisode || loadedEpisode).title}${saved ? '' : '*'} | BookBrowser`;
    } else {
      document.title = 'Edit | BookBrowser';
    }
  }, [episode, savedEpisode, loadedEpisode, saved]);

  useEffect(() => {
    load(Number(id));
  }, [id, load]);

  useEffect(() => {
    if (loadedEpisode) {
      setEpisode(loadedEpisode);
    }
  }, [loadedEpisode]);

  useEffect(() => {
    if (savedEpisode) {
      setEpisode(savedEpisode);
      setSaved(true);
    }
  }, [savedEpisode]);

  return (
    <Container maxWidth="md" className="mt-3">
      {loadingEpisode && <Loading />}
      {loadError && <ErrorMessage error={loadError} />}
      {episode && (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/episodes' }}>
              Episodes
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/series/${episode.seriesId}` }}>
              {episode.seriesTitle}
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/episodes/${episode.id}` }}>
              {(savedEpisode || loadedEpisode)?.title}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
          </Breadcrumb>
          <Heading as="h1">Edit Episode</Heading>
          <EpisodeForm
            value={episode}
            onChange={onChange}
            onSubmit={onSubmit}
            footer={
              <div>
                {saveError && (
                  <ErrorAlert uiMessage="Something went wrong. Unable to save this entry." error={saveError} />
                )}
                {!saveError && savedEpisode && (
                  <Alert variant="success" className="mb-2">
                    Changes successfully saved
                  </Alert>
                )}
                <div className="d-flex">
                  <Button className="me-2" variant="secondary" disabled={savingEpisode} onClick={cancel}>
                    Cancel
                  </Button>
                  <Button className="me-auto" variant="secondary" disabled={savingEpisode} onClick={reset}>
                    Reset
                  </Button>
                  <Button variant="primary" type="submit" disabled={savingEpisode}>
                    {!savingEpisode && <span>Save</span>}
                    {savingEpisode && (
                      <span>
                        Saving <CircularProgress color="secondary" size={'15px'} />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      )}
    </Container>
  );
};

export default EditEpisodePage;
