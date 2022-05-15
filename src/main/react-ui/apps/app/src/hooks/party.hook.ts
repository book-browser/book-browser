import { searchForParty } from 'services/party.service';
import { usePromise } from './promise.hook';

export const useSearchForParty = () => usePromise(searchForParty);
