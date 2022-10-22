import MDEditor from '@uiw/react-md-editor';
import EpisodeDataView from 'components/episode-data-view/episode-data-view';
import Heading from 'components/navigation/heading/heading';
import React from 'react';
import { Link } from 'react-router-dom';
import { Episode } from 'types/episode';
import './episode-details.scss';

export type EpisodeDetailsProps = {
  episode: Episode;
};

export const EpisodeDetails = ({ episode }: EpisodeDetailsProps) => {
  return (
    <div className="episode-details">
      <img className="episode-details-thumbnail" alt="thumbnail" src={`/api/episode/${episode.id}/thumbnail`} />
      <div className="flex-grow-1">
        <Heading as="h1">{episode.title}</Heading>
        {episode.seriesId && (
          <p>
            <strong>Series: </strong> <Link to={`/series/${episode.seriesId}`}>{episode.seriesTitle}</Link>
          </p>
        )}
        {episode.description && <MDEditor.Markdown source={episode.description} />}
      </div>
      <div className="side">
        <EpisodeDataView data={episode} />
      </div>
    </div>
  );
};

export default EpisodeDetails;
