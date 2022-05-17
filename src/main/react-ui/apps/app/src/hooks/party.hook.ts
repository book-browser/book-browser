import { findAllParties, findAllPublishers } from 'services/party.service';
import { usePromise } from './promise.hook';

export const useFindAllParties = () => usePromise(findAllParties);

export const useFindAllPublisher = () => usePromise(findAllPublishers);
