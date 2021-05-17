import { createBook } from "services/book.service";
import { usePromise } from "./promise.hook";

export const useCreateBook = () => usePromise(createBook);