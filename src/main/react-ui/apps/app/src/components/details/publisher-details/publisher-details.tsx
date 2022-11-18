import PublisherDataView from 'components/data-views/publisher-data-view/publisher-data-view';
import ExternalLink from 'components/navigation/external-link/external-link';
import React from 'react';
import { Publisher } from 'types/publisher';

export type PublisherDetailsProps = {
  data: Publisher;
};

const PublisherDetails = ({ data }: PublisherDetailsProps) => {
  return (
    <div>
      <div className="mb-1">
        <strong>{data.url ? <ExternalLink href={data.url}>{data.fullName}</ExternalLink> : data.fullName}</strong>
      </div>
      <hr />
      <PublisherDataView data={data} />
    </div>
  );
};

PublisherDetails.displayName = 'PublisherDetails';
export default PublisherDetails;
