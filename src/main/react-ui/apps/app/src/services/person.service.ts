import { Person } from "types/person";
import { handleResponse } from "./response.service";

export const searchForPerson = async (query: string) => {
  const response = await fetch('/api/persons/search', {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return await handleResponse<Person[]>(response);
}

