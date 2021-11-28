import { Letter } from "types/letter";
import { Page } from "types/page";
import { Series } from "types/series";
import { handleResponse } from "./response.service";

export const save = async (series: Series) => {
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

export const findAll = async({ limit, page, sort, order, titleStartsWith }: 
  {
    page?: number,
    limit?: number,
    sort?: keyof Series,
    order?: 'asc' | 'desc',
    titleStartsWith?: Letter
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
  if (titleStartsWith) {
    params.append('titleStartsWith', titleStartsWith.value);
  }

  const response = await fetch('/api/series?' + params.toString());
  return await handleResponse<Page<Series>>(response);
}