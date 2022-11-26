/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';
import { EpisodeDetails } from 'components/details/episode-details/episode-details';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import { useFindAllEpisodes, useGetEpisodeById } from 'hooks/episode.hook';
import React, { useEffect } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Episode } from 'types/episode';
import './episode-page.scss';

const EpisodePageHeader = ({ episode }: { episode: Episode }) => {
  return (
    <div className="episode-page-header">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
          Series
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/series/${episode.seriesUrlTitle}` }}>
          {episode.seriesTitle}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{episode.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Button as={Link as any} to={`/episodes/${episode.id}/edit`} className="ms-auto" variant="primary">
        <EditIcon /> Edit
      </Button>
    </div>
  );
};

const EpisodePageContent = () => {
  const { data: episode, execute, loading, error } = useGetEpisodeById();
  const { id } = useParams();

  const {
    data: otherEpisodes,
    execute: findOtherEpisodes,
    loading: loadingOtherEpisodes,
    error: otherEpisodesError
  } = useFindAllEpisodes();

  useEffect(() => {
    execute(Number(id));
  }, [id, execute]);

  useEffect(() => {
    if (episode) {
      findOtherEpisodes({
        limit: 19,
        sort: 'releaseDate',
        order: 'desc',
        seriesId: episode.seriesUrlTitle
      });
    }
  }, [episode, findOtherEpisodes]);

  useEffect(() => {
    if (episode) {
      document.title = `${episode.title} | BookBrowser`;
    } else {
      document.title = 'BookBrowser';
    }
  }, [episode]);

  if (loading || loadingOtherEpisodes) {
    return <Loading />;
  }
  if (error || otherEpisodesError) {
    return <ErrorMessage error={error || otherEpisodesError} />;
  }
  if (episode && otherEpisodes) {
    return (
      <>
        <EpisodePageHeader episode={episode} />
        <EpisodeDetails
          episode={episode}
          otherSeriesEpisodes={otherEpisodes.items.filter((item) => item.id !== episode.id).slice(0, 18)}
          totalSeriesEpisodes={otherEpisodes.totalElements}
        />
      </>
    );
  }
  return null;
};

export const EpisodePage = () => {
  return (
    <Container maxWidth="lg">
      <EpisodePageContent />
    </Container>
  );
};

export default EpisodePage;
