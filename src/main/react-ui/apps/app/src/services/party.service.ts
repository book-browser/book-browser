import { DeepPartial } from '@reduxjs/toolkit';
import { Page } from 'types/page';
import { Party } from 'types/party';
import { getFileBase64 } from 'utils/file-utils';
import { generateEncodedUrl } from 'utils/location-utils';
import { handleResponse } from './response.service';

export declare type PartySearchCriteria = {
  limit: number;
  page: number;
  sort: 'id' | 'title';
  order: 'asc' | 'desc';
  name?: string | null;
};

declare type PartyDto = {
  id: number;
  fullName: string;
  description?: string;
  picture?: string;
  hasThumbnail?: boolean;
};

const mapPartyToPartyDto = async (party: DeepPartial<Party>) => {
  return {
    ...party,
    picture: party.picture ? await getFileBase64(party.picture as File) : party.picture
  } as PartyDto;
};

const mapPartyDtoToParty = async (partyDto: PartyDto) => {
  return {
    ...partyDto,
    picture: undefined
  } as Party;
};

export const getPartyById = async (id: number) => {
  return mapPartyDtoToParty(await handleResponse<PartyDto>(await fetch(`/api/party/${id}`)));
};

export const createOrUpdateParty = async (party: DeepPartial<Party>) => {
  const response = await fetch('/api/party', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(await mapPartyToPartyDto(party))
  });

  return mapPartyDtoToParty(await handleResponse<PartyDto>(response));
};

export const findAllParties = async (searchCriteria: PartySearchCriteria) => {
  const response = await fetch(generateEncodedUrl('/api/parties', searchCriteria));
  return handleResponse<Page<Party>>(response);
};

export const findAllPublishers = async (searchCriteria: PartySearchCriteria) => {
  const response = await fetch(generateEncodedUrl('/api/parties/publisher', searchCriteria));
  return handleResponse<Page<Party>>(response);
};
