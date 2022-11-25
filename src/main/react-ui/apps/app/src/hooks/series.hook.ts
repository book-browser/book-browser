import { deleteSeriesById, findAllSeries, getById, save } from 'services/series.service';
import { usePromise } from './promise.hook';

export const useSave = () => usePromise(save);

export const useGetById = () => usePromise(getById);

export const useDeleteSeriesById = () => usePromise(deleteSeriesById);

export const useFindAllSeries = () => usePromise(findAllSeries);
