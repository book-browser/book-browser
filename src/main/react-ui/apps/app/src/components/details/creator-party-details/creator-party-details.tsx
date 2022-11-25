import MDEditor from '@uiw/react-md-editor';
import Heading from 'components/navigation/heading/heading';
import SeriesList from 'components/series-list/series-list';
import React from 'react';
import { Party } from 'types/party';
import { Series } from 'types/series';

export type CreatorPartyDetailsProps = {
  creator: Party;
  series: Series[];
  totalSeries: number;
};

const CreatorPartyDetails = ({ creator, series, totalSeries }: CreatorPartyDetailsProps) => {
  return (
    <div>
      <div className="d-flex mb-3">
        {creator.hasPicture && (
          <img className="party-details-picture" alt="party" src={`/api/party/${creator.id}/picture`} />
        )}
        <div className="flex-grow-1">
          <Heading as="h1">{creator.fullName}</Heading>
          <MDEditor.Markdown source={creator.description} />
        </div>
      </div>

      {series.length > 0 && (
        <div className="mb-3">
          <Heading as="h2">All Series</Heading>
          <SeriesList seriesList={series} />
        </div>
      )}
    </div>
  );
};

export default CreatorPartyDetails;
