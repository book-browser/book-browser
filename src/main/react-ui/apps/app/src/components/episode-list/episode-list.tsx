import CardList from 'components/card-list/card-list';
import EpisodeCard from 'components/episode-card/episode-card';
import React from 'react';
import { Episode } from 'types/episode';
import './episode-list.scss';

export interface EpisodeListProps {
  episodes: Episode[]
}

const EpisodeList = ({
  episodes
}: EpisodeListProps) => {
  return (
    <CardList>
      {episodes.map((episode) => (
        <EpisodeCard episode={episode} key={episode.id} />
      ))}
    </CardList>
  );
};

export default EpisodeList;