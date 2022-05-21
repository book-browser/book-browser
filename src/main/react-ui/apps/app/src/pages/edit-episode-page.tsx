import { CircularProgress, Container } from '@mui/material';
import { DeepPartial } from '@reduxjs/toolkit';
import { ErrorAlert } from 'components/error/error-alert';
import { EpisodeForm } from 'components/form/episode-form/episode-form';
import Loading from 'components/loading/loading';
import { NotFound } from 'components/message/not-found/not-found';
import { useGetEpisodeById, useCreateOrUpdateEpisode } from 'hooks/episode.hook';
import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ApiError } from 'types/api-error';
import { Episode } from 'types/episode';

const UNSAVED_MESSAGE = 'Are you sure that you want to leave with unsaved changes?';

export const EditEpisodePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: loadedEpisode, execute: load, loading: loadingEpisode, error: loadError } = useGetEpisodeById();
  const { data: savedEpisode, execute: save, loading: savingEpisode, error: saveError } = useCreateOrUpdateEpisode();
  const notFound = loadError?.name === 'ApiError' && (loadError as ApiError)?.status === 404;

  const [episode, setEpisode] = useState<DeepPartial<Episode>>();
  const [saved, setSaved] = useState(true);

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
    navigate(`/episode/${episode.id}`);
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
      {loadError && !notFound && (
        <ErrorAlert uiMessage="Something went wrong. Unable to load this entry." error={loadError} />
      )}
      {loadError && notFound && <NotFound />}
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
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/episode/${episode.id}` }}>
              {(savedEpisode || loadedEpisode)?.title}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="heading-main">Edit Episode</h1>
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
          {/* <Prompt when={!saved} message={UNSAVED_MESSAGE} /> */}
        </div>
      )}
    </Container>
  );
};

export default EditEpisodePage;
