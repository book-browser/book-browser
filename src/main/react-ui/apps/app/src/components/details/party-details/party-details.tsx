import MDEditor from '@uiw/react-md-editor';
import Heading from 'components/navigation/heading/heading';
import React from 'react';
import { Party } from 'types/party';
import './party-details.scss';

export type PartyDetailsProps = {
  party: Party;
};

export const PartyDetails = ({ party }: PartyDetailsProps) => {
  return (
    <div className="party-details">
      {party.hasPicture && <img className="party-details-picture" alt="party" src={`/api/party/${party.id}/picture`} />}
      <div className="flex-grow-1">
        <Heading as="h1">{party.fullName}</Heading>
        <MDEditor.Markdown source={party.description} />
      </div>
    </div>
  );
};

export default PartyDetails;
