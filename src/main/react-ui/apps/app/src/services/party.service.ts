import { Page } from 'types/page';
import { Party } from 'types/party';
import { generateEncodedUrl } from 'utils/location-utils';
import { handleResponse } from './response.service';

export declare type PartySearchCriteria = {
  limit: number;
  page: number;
  sort: 'id' | 'title';
  order: 'asc' | 'desc';
  name?: string | null;
};

export const findAllParties = async (searchCriteria: PartySearchCriteria) => {
  const response = await fetch(generateEncodedUrl('/api/parties', searchCriteria));
  return handleResponse<Page<Party>>(response);
};

export const findAllPublishers = async (searchCriteria: PartySearchCriteria) => {
  const response = await fetch(generateEncodedUrl('/api/parties/publisher', searchCriteria));
  return handleResponse<Page<Party>>(response);
};
