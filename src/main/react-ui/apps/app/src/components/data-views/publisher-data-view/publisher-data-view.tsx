import DataView, { DataViewItem } from 'components/representation/data-view/data-view';
import { Completion, CostAccess, Distribution } from 'consts';
import React from 'react';
import { Publisher } from 'types/publisher';

export type PublisherDataViewProps = {
  data: Publisher;
};

const PUBLISHER_DATA_VIEW_ITEM: DataViewItem<Publisher>[] = [
  {
    heading: 'Available Episodes:',
    content: (data) => data.episodeCount,
    hidden: (data) => data.episodeCount === null
  },
  {
    heading: 'Distribution:',
    content: (data) => (data.distribution ? Distribution[data.distribution].label : 'N/A')
  },
  {
    heading: 'Content Restriction:',
    content: (data) => (data.costAccess ? CostAccess[data.costAccess].label : 'N/A')
  },
  {
    heading: 'Cost:',
    content: (data) =>
      data.cost.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }),
    hidden: (data) => data.cost === null
  },
  {
    heading: 'Listed Status:',
    content: (data) => (data.completion ? Completion[data.completion].label : 'N/A')
  },
  {
    heading: 'Preview Available:',
    content: (data) => (data.preview ? 'Yes' : 'No'),
    hidden: (data) => data.preview === null
  }
];

const PublisherDataView = ({ data }: PublisherDataViewProps) => {
  return <DataView items={PUBLISHER_DATA_VIEW_ITEM} data={data} />;
};

PublisherDataView.displayName = 'PublisherDataView';
export default PublisherDataView;
