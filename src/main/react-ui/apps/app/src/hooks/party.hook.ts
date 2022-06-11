import { createOrUpdateParty, findAllParties, findAllPublishers, getPartyById } from 'services/party.service';
import { usePromise } from './promise.hook';

export const useFindAllParties = () => usePromise(findAllParties);

export const useFindAllPublisher = () => usePromise(findAllPublishers);

export const useCreateOrUpdateParty = () => usePromise(createOrUpdateParty);

export const useGetPartyById = () => usePromise(getPartyById);
