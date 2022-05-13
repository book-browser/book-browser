import { Container } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { EpisodeDetails } from 'components/episode-details/episode-details';
import Loading from 'components/loading/loading';
import { NotFound } from 'components/message/not-found/not-found';
import { SomethingWentWrong } from 'components/message/something-went-wrong/something-went-wrong';
import { useGetEpisodeById } from 'hooks/episode.hook';
import React, { useEffect } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { ApiError } from 'types/api-error';
import { Episode } from 'types/episode';

const EpisodePageHeader = ({ episode }: {
  episode: Episode
}) => {
  return (
    <div className="d-flex align-items-start">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/home"}}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: "/series"}}>Series</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{to: `/series/${episode.seriesId}`}}>{episode.seriesTitle}</Breadcrumb.Item>
        <Breadcrumb.Item active>{episode.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Button as={Link} to={`/episode/${episode.id}/edit`} className="ml-auto" variant="primary"><EditIcon /> Edit</Button>
    </div>
  );
}

const EpisodePageContent = () => {
  const { data: episode, execute, loading, error } = useGetEpisodeById();
  const { id } = useParams();
  const apiError = error?.name === 'ApiError' && error as ApiError;
  const notFound = apiError?.status === 404 ;

  useEffect(() => {
    execute(id);
  }, [id]);

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
    if (notFound) {
      return <NotFound />;
    }
    return <SomethingWentWrong error={error}/>;
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
}


export const EpisodePage = () => {
  return (
    <Container maxWidth="lg">
      <EpisodePageContent />
    </Container>
  );
};

export default EpisodePage;
