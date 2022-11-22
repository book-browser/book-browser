import GenreBadge from 'components/genre-badge/genre-badge';
import ExternalLink from 'components/navigation/external-link/external-link';
import DataView, { DataViewItem } from 'components/representation/data-view/data-view';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'types/link';
import { Genre } from 'types/genre';
import { Series } from 'types/series';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Info } from '@mui/icons-material';
import PublisherDetails from 'components/details/publisher-details/publisher-details';
import { Status } from 'consts';

export type SeriesDataViewProps = {
  data: Series;
};

const getAllExternalLinks = (series: Series) => {
  return [
    ...series.links,
    ...(series.publishers
      .map((publisher) =>
        publisher.url
          ? {
              url: publisher.url,
              description: `${publisher.fullName} Series URL`
            }
          : undefined
      )
      .filter((link) => !!link) as Link[])
  ];
};

const SERIES_DATA_VIEW_ITEMS: DataViewItem<Series>[] = [
  {
    heading: 'Status:',
    content: (series) => (series.status ? Status[series.status].label : 'N/A')
  },
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
          <RouterLink to={`/parties/${publisher.partyId}`}>{publisher.fullName}</RouterLink>
          <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={
              <Popover>
                <Popover.Header>Publisher Info</Popover.Header>
                <Popover.Body>
                  <PublisherDetails data={publisher} />
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="link" className="btn-xs">
              <Info fontSize="small" />
            </Button>
          </OverlayTrigger>
          {index !== series.links.length - 1 && ', '}
        </span>
      )),
    hidden: (series) => series.publishers.length === 0
  },
  {
    heading: 'External Links:',
    content: (series) =>
      getAllExternalLinks(series).map((link, index, links) => (
        <span key={link.url}>
          <ExternalLink href={link.url}>{link.description}</ExternalLink>
          {index !== links.length - 1 && ', '}
        </span>
      )),
    hidden: (series) => getAllExternalLinks(series).length === 0
  }
];

export const SeriesDataView = ({ data }: SeriesDataViewProps) => {
  return <DataView items={SERIES_DATA_VIEW_ITEMS} data={data} />;
};

export default SeriesDataView;
