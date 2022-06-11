import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import { Party } from 'types/party';
import './party-details.scss';

export declare type PartyDetailsProps = {
  party: Party;
};

export const PartyDetails = ({ party }: PartyDetailsProps) => {
  return (
    <div className="party-details">
      {party.hasPicture && <img className="party-details-picture" alt="party" src={`/api/party/${party.id}/picture`} />}
      <div className="flex-grow-1">
        <h1 className="heading-main">{party.fullName}</h1>
        <MDEditor.Markdown source={party.description} />
      </div>
    </div>
  );
};

export default PartyDetails;
