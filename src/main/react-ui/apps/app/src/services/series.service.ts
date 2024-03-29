import { GenreEnum, LetterEnum, StatusEnum } from 'enum';
import { Letter } from 'types/letter';
import { Page } from 'types/page';
import { Series, SeriesForm } from 'types/series';
import { getFileBase64 } from 'utils/file-utils';
import { handleEmptyResponse, handleResponse } from './response.service';

export const save = async (series: SeriesForm) => {
  const response = await fetch('/api/series', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(await mapSeriesFormToSeriesDto(series))
  });

  return await handleResponse<Series>(response);
};

const mapSeriesFormToSeriesDto = async (series: SeriesForm) => {
  return {
    ...series,
    banner: series.banner ? await getFileBase64(series.banner as File) : series.banner,
    thumbnail: series.thumbnail ? await getFileBase64(series.thumbnail as File) : series.thumbnail
  };
};

export const getById = async (id: number | string) => {
  const response = await fetch(`/api/series/${id}`);
  return await handleResponse<Series>(response);
};

export const deleteSeriesById = async (id: number) => {
  const response = await fetch(`/api/series/${id}`, {
    method: 'DELETE'
  });
  return handleEmptyResponse(response);
};

export const findAllSeries = async ({
  query,
  status,
  titleStartsWith,
  startDate,
  endDate,
  genres,
  publisher,
  creator,
  limit,
  page,
  sort,
  order
}: {
  query?: string;
  status?: StatusEnum | null;
  titleStartsWith?: LetterEnum;
  startDate?: Date;
  endDate?: Date;
  genres?: GenreEnum[];
  publisher?: string | number;
  creator?: string | number;
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
  if (publisher) {
    params.append('publisher', `${publisher}`);
  }
  if (creator) {
    params.append('creator', `${creator}`);
  }
  if (startDate) {
    params.append('startDate', startDate.toISOString().substring(0, 10));
  }
  if (endDate) {
    params.append('endDate', endDate.toISOString().substring(0, 10));
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
    params.append('titleStartsWith', titleStartsWith);
  }
  if (genres) {
    genres.forEach((genre) => params.append('genres', genre));
  }

  const response = await fetch('/api/series?' + params.toString());
  return await handleResponse<Page<Series>>(response);
};
