import { Book } from "types/book";
import { Genre } from "types/genre";
import { mapPageItems, Page } from "types/page";
import { handleResponse } from "./response.service";

export const saveBook = async (book: Book) => {
  const response = await fetch('/api/book', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(book),
  });

  return convertBookResponseToBook(await handleResponse(response));
}

export const getById = async (id: number) => {
  const response = await fetch(`/api/book/${id}`);
  return convertBookResponseToBook(await handleResponse(response));
}

export const search = async({ query, genres, page, limit }: 
  { 
    query?: string,
    genres?: Genre[],
    page?: number,
    limit?: number,
  }) => {

  const params = new URLSearchParams();

  if (query) {
    params.append('query', query);
  }
  if (page) {
    params.append('page', `${page}`);
  }
  if (limit) {
    params.append('limit', `${limit}`);
  }
  if (genres) {
    genres.map((genre) => genre.name)
          .forEach((genreName) => params.append('genres', genreName));
  }

  const response = await fetch('/api/books/search?' + params.toString());
  return (await handleResponse<any[]>(response)).map(convertBookResponseToBook);
}

export const findAll = async({ limit, page, sort, order, startReleaseDate, endReleaseDate }: 
  {
    page?: number,
    limit?: number,
    sort?: keyof Book,
    order?: 'asc' | 'desc',
    startReleaseDate?: Date,
    endReleaseDate?: Date
  }) => {

  const params = new URLSearchParams();

 
  if (page) {
    params.append('page', `${page}`);
  }
  if (limit) {
    params.append('limit', `${limit}`);
  }
  if (sort) {
    params.append('sort', sort);
  }
  if (order) {
    params.append('order', order);
  }
  if (startReleaseDate) {
    params.append('startReleaseDate', startReleaseDate.toISOString().substring(0, 10));
  }
  if (endReleaseDate) {
    params.append('endReleaseDate', endReleaseDate.toISOString().substring(0, 10));
  }

  const response = await fetch('/api/books?' + params.toString());
  return mapPageItems(await handleResponse<Page<any>>(response), convertBookResponseToBook);
}

const convertBookResponseToBook = (data: any) => {
  return {
    ...data,
    releaseDate: new Date(data.releaseDate)
  } as Book;
}

