import { saveBook, getById, search, findAll } from "services/book.service";
import { usePromise } from "./promise.hook";

export const useSaveBook = () => usePromise(saveBook);

export const useGetBook = () => usePromise(getById);

export const useSearch = () => usePromise(search);

export const useFindAll = () => usePromise(findAll);