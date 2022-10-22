import ExternalLink from 'components/navigation/external-link/external-link';
import DataView, { DataViewItem } from 'components/representation/data-view/data-view';
import React from 'react';
import { Episode } from 'types/episode';

export type EpisodeDataViewProps = {
  data: Episode;
};

const EPISODE_DATA_VIEW_ITEMS: DataViewItem<Episode>[] = [
  {
    heading: 'Release Date:',
    content: (episode) => episode.releaseDate.toLocaleDateString()
  },
  {
    heading: 'External Links:',
    content: (episode) =>
      episode.links.map((link, index) => (
        <span key={link.url}>
          <ExternalLink href={link.url}>{link.description}</ExternalLink>
          {index !== episode.links.length - 1 && ', '}
        </span>
      )),
    hidden: (episode) => episode.links.length === 0
  }
];

export const EpisodeDataView = ({ data }: EpisodeDataViewProps) => {
  return <DataView items={EPISODE_DATA_VIEW_ITEMS} data={data} />;
};

export default EpisodeDataView;
