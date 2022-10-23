import { Container } from '@mui/material';
import EpisodeList from 'components/episode-list/episode-list';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import Heading from 'components/navigation/heading/heading';
import Pagination from 'components/pagination/pagination';
import { useFindAllEpisodes } from 'hooks/episode.hook';
import { useGetById } from 'hooks/series.hook';
import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { generateEncodedUrl, parseParams } from 'utils/location-utils';
import * as yup from 'yup';

type SeriesEpisodesPageParams = {
  page: number;
};

const schema = yup.object().shape({
  page: yup
    .number()
    .min(0)
    .transform((val) => val - 1)
    .default(0)
}) as yup.SchemaOf<SeriesEpisodesPageParams>;

export const SeriesEpisodePageContent = () => {
  const { data: series, execute, error: seriesError, loading: loadingSeries } = useGetById();
  const {
    data: episodes,
    execute: findAllEpisodes,
    error: episodesError,
    loading: loadingEpisodes
  } = useFindAllEpisodes();

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = parseParams(location, schema);

  const [page, setPage] = useState(params.page);

  const onPageChange = (newPage) => {
    navigate(generateEncodedUrl(`/series/${series.id}/episodes`, { page: newPage > 0 ? newPage + 1 : undefined }));
  };

  useEffect(() => {
    if (params.page !== page) {
      setPage(params.page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    execute(Number(id));
  }, [id, execute]);

  useEffect(() => {
    if (series) {
      findAllEpisodes({ seriesId: series.id, page, limit: 24 });
    }
  }, [series, page, findAllEpisodes]);

  useEffect(() => {
    if (series) {
      document.title = `${series.title} Episodes | BookBrowser`;
    } else {
      document.title = 'Episodes | BookBrowser';
    }
  }, [series]);

  if (seriesError) {
    <ErrorMessage error={seriesError} />;
  }

  if (loadingSeries || loadingEpisodes) {
    return <Loading />;
  }

  if (series) {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
            Series
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/series/${series.id}` }}>
            {series.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Episodes</Breadcrumb.Item>
        </Breadcrumb>
        <Heading as="h1">{`${series.title} Episodes`}</Heading>
        {episodesError && <ErrorAlert error={episodesError} />}
        {episodes && (
          <>
            <EpisodeList episodes={episodes.items} />
            <Pagination page={page} totalPages={episodes.totalPages} onPageChange={onPageChange} />
          </>
        )}
      </>
    );
  }
  return null;
};

export const SeriesEpisodePage = () => {
  return (
    <Container maxWidth="lg">
      <SeriesEpisodePageContent />
    </Container>
  );
};

export default SeriesEpisodePage;
