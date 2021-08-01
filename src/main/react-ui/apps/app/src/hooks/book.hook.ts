import { createBook, getById } from "services/book.service";
import { usePromise } from "./promise.hook";

export const useCreateBook = () => usePromise(createBook);

export const useGetBook = () => usePromise(getById);