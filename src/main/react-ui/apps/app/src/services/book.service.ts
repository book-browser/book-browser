import { Book } from "types/book";
import { BookSubmission } from "types/book-submission";
import { Genre } from "types/genre";
import { handleResponse } from "./response.service";

export const saveBook = async (book: Book) => {
  const response = await fetch('/api/book', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(book),
  });

  return await handleResponse<Book>(response);
}

export const getById = async (id: number) => {
  const response = await fetch(`/api/book/${id}`);
  return await handleResponse<Book>(response);
}

export const search = async({ query, genres }: 
  { 
    query?: string,
    genres?: Genre[],
  }) => {

  const params = new URLSearchParams();

  if (query) {
    params.append('query', query);
  }

  if (genres) {
    genres.map((genre) => genre.name)
          .forEach((genreName) => params.append('genres', genreName));
  }

  const response = await fetch('/api/book/search?' + params.toString());
  return await handleResponse<Book[]>(response);
}
