import { Genre } from 'types/genre';
import { Letter } from "types/letter";
import { Page } from "types/page";
import { Series } from "types/series";
import { handleResponse } from "./response.service";

export const save = async (series: Series) => {
  console.log(series, JSON.stringify(series));
  const response = await fetch('/api/series', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(series),
  });

  return await handleResponse<Series>(response);
}

export const getById = async (id: number) => {
  const response = await fetch(`/api/series/${id}`);
  return await handleResponse<Series>(response);
}

export const findAll = async({ query, limit, page, sort, order, titleStartsWith, genres }: 
  {
    query?: string,
    page?: number,
    limit?: number,
    sort?: keyof Series,
    order?: 'asc' | 'desc',
    titleStartsWith?: Letter,
    genres?: Genre[],
  }) => {

  const params = new URLSearchParams();

  if (query) {
    params.append('query', `${query}`);
  }
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
  if (titleStartsWith) {
    params.append('titleStartsWith', titleStartsWith.value);
  }
  if (genres) {
    genres.map((genre) => genre.name)
          .forEach((genreName) => params.append('genres', genreName));
  }

  const response = await fetch('/api/series?' + params.toString());
  return await handleResponse<Page<Series>>(response);
}