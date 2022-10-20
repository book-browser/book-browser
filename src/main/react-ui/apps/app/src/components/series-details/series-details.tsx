import { Add } from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import BookList from 'components/book-list/book-list';
import EpisodeList from 'components/episode-list/episode-list';
import GenreBadge from 'components/genre-badge/genre-badge';
import ExternalLink from 'components/navigation/external-link/external-link';
import Heading from 'components/navigation/heading/heading';
import SeriesDataView from 'components/series-data-view/series-data-view';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Genre } from 'types/genre';
import { Series } from 'types/series';
import './series-details.scss';

export type SeriesDetailsProps = {
  series: Series;
};

export const SeriesDetails = ({ series }: SeriesDetailsProps) => {
  return (
    <div className="series-details">
      <div className="mb-4">
        {series.hasBanner && <img className="details-banner" alt="banner" src={`/api/series/${series.id}/banner`} />}
        {!series.hasBanner && series.hasThumbnail && (
          <div className="d-flex">
            <img className="details-thumbnail m-auto" alt="banner" src={`/api/series/${series.id}/thumbnail`} />
          </div>
        )}
      </div>
      <Heading as="h1" id="series">
        {series.title}
      </Heading>
      <p>
        {series.creators.map((creator, index) => (
          <span key={creator.partyId}>
            <Link to={`/parties/${creator.partyId}`}>{creator.fullName}</Link>
            {index !== series.creators.length - 1 && ', '}
          </span>
        ))}
      </p>
      <div>
        <MDEditor.Markdown source={series.description} />
        <hr />
      </div>
      <div>
        <SeriesDataView data={series} />
        <hr />
      </div>

      {series.books.length > 0 && (
        <div className="mb-3">
          <Heading as="h2">Books</Heading>
          <BookList books={series.books} />
        </div>
      )}

      {series.episodes.length > 0 && (
        <div className="mb-3">
          <div className="d-flex align-items-start mb-2">
            <Heading as="h2" id="episodes">
              Episodes
            </Heading>
            <Button as={Link as any} to={`/episodes/new?seriesId=${series.id}`} className="ms-auto" variant="primary">
              <Add /> New Episode
            </Button>
          </div>
          <EpisodeList episodes={series.episodes.slice(0, 12)} />
          {series.episodes.length > 12 && (
            <div>
              <Link to={`/series/${series.id}/episodes`}>View More</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeriesDetails;
