import { Party } from 'types/party';
import { handleResponse } from './response.service';

export const searchForParty = async (query: string) => {
  const response = await fetch('/api/party/search', {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await handleResponse<Party[]>(response);
};
