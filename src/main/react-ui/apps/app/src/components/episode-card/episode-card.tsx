import { Card } from 'components/card/card';
import { ImgLink } from 'components/img-link/img-link';
import { Link } from 'react-router-dom';
import React from 'react';
import { Episode } from 'types/episode';
import './episode-card.scss';
import moment from 'moment';

export interface EpisodeCardProps {
  episode: Episode;
}

export const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <Card className="episode-card">
      <Card.Thumbnail>
        <ImgLink to={`/episodes/${episode.id}`} imgProps={{ alt: 'thumbnail', src: episode.thumbnailUrl }} />
      </Card.Thumbnail>
      <div>
        <Link to={`/episodes/${episode.id}`}>{episode.title}</Link>
        <div>
          <small>{moment(episode.releaseDate).format('M/D/YYYY')}</small>
        </div>
      </div>
    </Card>
  );
};

export default EpisodeCard;
