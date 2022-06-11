import { Add } from '@mui/icons-material';
import MDEditor from '@uiw/react-md-editor';
import BookList from 'components/book-list/book-list';
import EpisodeList from 'components/episode-list/episode-list';
import GenreBadge from 'components/genre-badge/genre-badge';
import PublisherList from 'components/publisher-list/publisher-list';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Genre } from 'types/genre';
import { Series } from 'types/series';
import './series-details.scss';

interface SeriesDetailsProps {
  series: Series;
}

const SeriesDetails = ({ series }: SeriesDetailsProps) => {
  return (
    <div className="series-details">
      <div className="mb-5">
        {series.hasBanner && <img className="details-banner" alt="banner" src={`/api/series/${series.id}/banner`} />}
        {!series.hasBanner && series.hasThumbnail && (
          <div className="d-flex">
            <img className="details-thumbnail m-auto" alt="banner" src={`/api/series/${series.id}/thumbnail`} />
          </div>
        )}
      </div>
      <h1 className="heading-main">{series.title}</h1>
      <p>
        {series.creators.map((creator, index) => (
          <span key={creator.partyId}>
            <Link to={`/party/${creator.partyId}`}>{creator.fullName}</Link>
            {index !== series.creators.length - 1 && ', '}
          </span>
        ))}
      </p>
      <MDEditor.Markdown source={series.description} />
      <div className="side mt-3">
        <span>
          <strong>Details</strong>
        </span>
        <div className="mb-4">
          <hr />
          <div className="mb-2">
            Genres:
            {series.genres.length === 0 && ' N/A'}
            {series.genres.map((genre) => (
              <GenreBadge key={genre} genre={{ name: genre } as Genre} variant="series" />
            ))}
          </div>
          {series.links.length > 0 && (
            <>
              <span>
                <strong>Relevant Links</strong>
              </span>
              <div className="mb-4">
                {series.links.map((link) => (
                  <div key={link.url}>
                    <Link to={{ pathname: link.url }} target="_blank">
                      {link.description}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {series.publishers.length > 0 && (
        <div className="mb-3">
          <strong>Publishers</strong>
          <PublisherList publishers={series.publishers} />
        </div>
      )}

      {series.books.length > 0 && (
        <div className="mb-3">
          <h2 className="heading-section">Books</h2>
          <BookList books={series.books} />
        </div>
      )}

      {series.episodes.length > 0 && (
        <div className="mb-3">
          <h2 className="heading-section d-flex align-items-start">
            <div>Episodes</div>
            <Button as={Link as any} to={`/episode/new?seriesId=${series.id}`} className="ms-auto" variant="primary">
              <Add /> New Episode
            </Button>
          </h2>
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
