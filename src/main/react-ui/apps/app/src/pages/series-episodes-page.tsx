import { Container } from "@material-ui/core";
import EpisodeList from "components/episode-list/episode-list";
import { NotFound } from "components/message/not-found/not-found";
import { SomethingWentWrong } from "components/message/something-went-wrong/something-went-wrong";
import Pagination from "components/pagination/pagination";
import { useFindAllEpisodes } from "hooks/episode.hook";
import { useGetById } from "hooks/series.hook";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { ApiError } from "types/api-error";
import { parseParams } from "utils/location-utils";
import * as yup from 'yup';

declare type SeriesEpisodesPageParams = {
  page: number
}

const schema = yup.object().shape({
  page: yup.number().min(0).transform((val) => val - 1).default(0),
}) as yup.SchemaOf<SeriesEpisodesPageParams>;

export const SeriesEpisodePageContent = () => {
  const { data: series, execute, loading, error } = useGetById();
  const { data: episodes, execute: findAllEpisodes, loading: loadingEpisodes, error: episodeError } = useFindAllEpisodes();
  
  const { id } = useParams();
  const history = useHistory();
  const location: Location = useLocation();
  const params = parseParams(location, schema);

  const [page, setPage] = useState(params.page);
  
  const apiError = error?.name === 'ApiError' && error as ApiError;
  const notFound = apiError?.status === 404 ;

  const onPageChange = (newPage) => {
    history.push(`/series/${series.id}/episodes${newPage > 0 ? `?page=${newPage + 1}` : ''}`);
  }
  
  useEffect(() => {
    if (params.page !== page) {
      setPage(params.page);
    }
  }, [params]);

  useEffect(() => {
    execute(id);
  }, [id, execute]);

  useEffect(() => {
    if (series) {
      findAllEpisodes({ seriesId: series.id, page, limit: 24 })
    }
  }, [series, page]);

  useEffect(() => {
    if (series) {
      document.title = `${series.title} Episodes | BookBrowser`;
    } else {
      document.title = 'Episodes | BookBrowser';
    }
  }, [series]);

  if (error) {
    if (notFound) {
      return <NotFound />;
    }
    return <SomethingWentWrong error={error}/>;
  }
  
  if (series && episodes) {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{to: "/home"}}>Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{to: "/series"}}>Series</Breadcrumb.Item>
          {series && <Breadcrumb.Item linkAs={Link} linkProps={{to: `/series/${series.id}`}}>{series.title}</Breadcrumb.Item>}
          <Breadcrumb.Item active>Episodes</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="heading-main">{`${series.title} Episodes`}</h1>
        <EpisodeList episodes={episodes.items} />
        <Pagination page={page} totalPages={episodes.totalPages} onPageChange={onPageChange} />
      </>
    )
  }
  return null;
}

export const SeriesEpisodePage = () => {
  return (
    <Container maxWidth="lg">
      <SeriesEpisodePageContent />
    </Container>
  )
}

export default SeriesEpisodePage;