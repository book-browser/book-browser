/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';
import { EpisodeDetails } from 'components/details/episode-details/episode-details';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import { useGetEpisodeById } from 'hooks/episode.hook';
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
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/series/${episode.seriesId}` }}>
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

  useEffect(() => {
    execute(Number(id));
  }, [id, execute]);

  useEffect(() => {
    if (episode) {
      document.title = `${episode.title} | BookBrowser`;
    } else {
      document.title = 'BookBrowser';
    }
  }, [episode]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (episode) {
    return (
      <>
        <EpisodePageHeader episode={episode} />
        <EpisodeDetails episode={episode} />
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
