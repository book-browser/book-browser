import { createOrUpdateEpisode, findAllEpisodes, getEpisodeById } from 'services/episode.service';
import { usePromise } from './promise.hook';

export const useCreateOrUpdateEpisode = () => usePromise(createOrUpdateEpisode);

export const useFindAllEpisodes = () => usePromise(findAllEpisodes);

export const useGetEpisodeById = () => usePromise(getEpisodeById);
