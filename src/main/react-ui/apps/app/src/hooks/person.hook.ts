import { searchForPerson } from "services/person.service";
import { usePromise } from "./promise.hook";

export const useSearchForPerson = () => usePromise(searchForPerson);