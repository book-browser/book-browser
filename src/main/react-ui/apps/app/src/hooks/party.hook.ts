import {
  createOrUpdateParty,
  findAllParties,
  findAllPublishers,
  getCreatorByIdOrUrlName,
  getPartyById,
  getPublisherByIdOrUrlName
} from 'services/party.service';
import { usePromise } from './promise.hook';

export const useFindAllParties = () => usePromise(findAllParties);

export const useFindAllPublisher = () => usePromise(findAllPublishers);

export const useCreateOrUpdateParty = () => usePromise(createOrUpdateParty);

export const useGetPartyById = () => usePromise(getPartyById);

export const useGetPublisherByIdOrUrlName = () => usePromise(getPublisherByIdOrUrlName);

export const useGetCreatorByIdOrUrlName = () => usePromise(getCreatorByIdOrUrlName);
