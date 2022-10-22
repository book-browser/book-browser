import GenreBadge from 'components/genre-badge/genre-badge';
import ExternalLink from 'components/navigation/external-link/external-link';
import DataView, { DataViewItem } from 'components/representation/data-view/data-view';
import React from 'react';
import { Link } from 'react-router-dom';
import { Genre } from 'types/genre';
import { Series } from 'types/series';

export type SeriesDataViewProps = {
  data: Series;
};

const SERIES_DATA_VIEW_ITEMS: DataViewItem<Series>[] = [
  {
    heading: 'Genres:',
    content: (series) =>
      series.genres.length === 0
        ? 'N/A'
        : series.genres.map((genre) => <GenreBadge key={genre} genre={{ name: genre } as Genre} variant="series" />)
  },
  {
    heading: 'Publishers:',
    content: (series) =>
      series.publishers.map((publisher, index) => (
        <span key={publisher.partyId}>
          <Link to={`/parties/${publisher.partyId}`}>{publisher.fullName}</Link>
          {index !== series.links.length - 1 && ', '}
        </span>
      )),
    hidden: (series) => series.publishers.length === 0
  },
  {
    heading: 'External Links:',
    content: (series) =>
      series.links.map((link, index) => (
        <span key={link.url}>
          <ExternalLink href={link.url}>{link.description}</ExternalLink>
          {index !== series.links.length - 1 && ', '}
        </span>
      )),
    hidden: (series) => series.links.length === 0
  }
];

export const SeriesDataView = ({ data }: SeriesDataViewProps) => {
  return <DataView items={SERIES_DATA_VIEW_ITEMS} data={data} />;
};

export default SeriesDataView;
