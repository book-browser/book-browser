import { GenreEnum, StatusEnum } from 'enum';
import { Letter } from 'types/letter';
import { Page } from 'types/page';
import { Series } from 'types/series';
import { getFileBase64 } from 'utils/file-utils';
import { handleEmptyResponse, handleResponse } from './response.service';

export const save = async (series: Series) => {
  const response = await fetch('/api/series', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(await mapSeriesToSeriesDto(series))
  });

  return await handleResponse<Series>(response);
};

const mapSeriesToSeriesDto = async (series: Series) => {
  return {
    ...series,
    banner: series.banner ? await getFileBase64(series.banner as File) : series.banner,
    thumbnail: series.thumbnail ? await getFileBase64(series.thumbnail as File) : series.thumbnail
  };
};

export const getById = async (id: number) => {
  const response = await fetch(`/api/series/${id}`);
  return await handleResponse<Series>(response);
};

export const deleteSeriesById = async (id: number) => {
  const response = await fetch(`/api/series/${id}`, {
    method: 'DELETE'
  });
  return handleEmptyResponse(response);
};

export const findAll = async ({
  query,
  status,
  limit,
  page,
  sort,
  order,
  titleStartsWith,
  genres
}: {
  query?: string;
  status?: StatusEnum | null;
  titleStartsWith?: Letter;
  genres?: GenreEnum[];
  page?: number;
  limit?: number;
  sort?: keyof Series;
  order?: 'asc' | 'desc';
}) => {
  const params = new URLSearchParams();

  if (query) {
    params.append('query', `${query}`);
  }
  if (status) {
    params.append('status', `${status}`);
  } else if (status === null) {
    params.append('status', '');
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
    genres.forEach((genre) => params.append('genres', genre));
  }

  const response = await fetch('/api/series?' + params.toString());
  return await handleResponse<Page<Series>>(response);
};
