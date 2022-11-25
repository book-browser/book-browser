import MDEditor from '@uiw/react-md-editor';
import Heading from 'components/navigation/heading/heading';
import SeriesList from 'components/series-list/series-list';
import React from 'react';
import { Link } from 'react-router-dom';
import { Party } from 'types/party';
import { Series } from 'types/series';

export type PublisherPartyDetailsProps = {
  party: Party;
  series: Series[];
  totalSeries: number;
};

const PublisherPartyDetails = ({ party, series, totalSeries }: PublisherPartyDetailsProps) => {
  return (
    <div>
      <div className="d-flex mb-3">
        {party.hasPicture && (
          <img className="party-details-picture" alt="party" src={`/api/party/${party.id}/picture`} />
        )}
        <div className="flex-grow-1">
          <Heading as="h1">{party.fullName}</Heading>
          <MDEditor.Markdown source={party.description} />
        </div>
      </div>

      {series.length > 0 && (
        <div className="mb-3">
          <Heading as="h2">All Series</Heading>
          <SeriesList seriesList={series} />
          {series.length < totalSeries && (
            <div>
              <Link to={`/publishers/${party.urlName}/series`}>View More</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PublisherPartyDetails;
