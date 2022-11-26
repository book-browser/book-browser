import MDEditor from '@uiw/react-md-editor';
import EpisodeDataView from 'components/episode-data-view/episode-data-view';
import EpisodeList from 'components/episode-list/episode-list';
import Heading from 'components/navigation/heading/heading';
import React from 'react';
import { Link } from 'react-router-dom';
import { Episode } from 'types/episode';
import './episode-details.scss';

export type EpisodeDetailsProps = {
  episode: Episode;
  otherSeriesEpisodes: Episode[];
  totalSeriesEpisodes: number;
};

export const EpisodeDetails = ({ episode, otherSeriesEpisodes, totalSeriesEpisodes }: EpisodeDetailsProps) => {
  return (
    <div className="episode-details">
      <div className="d-flex mb-3">
        <img className="episode-details-thumbnail" alt="thumbnail" src={episode.thumbnailUrl} />
        <div className="flex-grow-1 ms-2">
          <Heading as="h1">{episode.title}</Heading>
          {episode.seriesId && (
            <p>
              <strong>Series: </strong> <Link to={`/series/${episode.seriesId}`}>{episode.seriesTitle}</Link>
            </p>
          )}
          {episode.description && <MDEditor.Markdown source={episode.description} />}
          <EpisodeDataView data={episode} />
        </div>
      </div>

      {otherSeriesEpisodes.length > 0 && (
        <div className="mb-3">
          <div className="d-flex align-items-start mb-2">
            <Heading as="h2" id="other-episodes">
              Other Episodes in Series
            </Heading>
          </div>
          <EpisodeList episodes={otherSeriesEpisodes} />
          {otherSeriesEpisodes.length < totalSeriesEpisodes && (
            <div>
              <Link to={`/series/${episode.seriesUrlTitle}/episodes`}>View More</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EpisodeDetails;
