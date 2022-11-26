import { DeepPartial } from '@reduxjs/toolkit';
import { Episode } from 'types/episode';
import { Link } from 'types/link';
import { mapPageItems, Page } from 'types/page';
import { getFileBase64 } from 'utils/file-utils';
import { handleResponse } from './response.service';

type EpisodeDto = {
  id: number;
  seriesId: number;
  title: string;
  description?: string;
  thumbnail?: string;
  releaseDate?: string;
  links: Link[];
};

const mapEpisodeToEpisodeDto = async (episode: DeepPartial<Episode>) => {
  return {
    ...episode,
    releaseDate: (episode.releaseDate as Date)?.toISOString(),
    thumbnail: episode.thumbnail ? await getFileBase64(episode.thumbnail as File) : episode.thumbnail
  } as EpisodeDto;
};

const mapEpisodeDtoToEpisode = (episodeDto: EpisodeDto) => {
  return {
    ...episodeDto,
    releaseDate: episodeDto.releaseDate && new Date(episodeDto.releaseDate),
    thumbnail: undefined
  } as Episode;
};

export const createOrUpdateEpisode = async (episode: DeepPartial<Episode>) => {
  const response = await fetch('/api/episode', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(await mapEpisodeToEpisodeDto(episode))
  });

  return mapEpisodeDtoToEpisode(await handleResponse<EpisodeDto>(response));
};

export const getEpisodeById = async (id: number) => {
  return mapEpisodeDtoToEpisode(await handleResponse<EpisodeDto>(await fetch(`/api/episode/${id}`)));
};

export const findAllEpisodes = async ({
  limit,
  page,
  sort,
  order,
  seriesId
}: {
  page?: number;
  limit?: number;
  sort?: keyof Episode;
  order?: 'asc' | 'desc';
  seriesId?: number | string;
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
  if (seriesId) {
    params.append('seriesId', `${seriesId}`);
  }
  const response = await fetch('/api/episodes?' + params.toString());
  const pageResponse = await handleResponse<Page<EpisodeDto>>(response);

  return mapPageItems(pageResponse, mapEpisodeDtoToEpisode);
};
