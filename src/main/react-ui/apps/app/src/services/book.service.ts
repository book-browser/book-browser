import { Book } from "types/book";
import { BookSubmission } from "types/book-submission";
import { handleResponse } from "./response.service";

export const createBook = async (bookSubmission: BookSubmission) => {
  const formData = new FormData();
  formData.append("title", bookSubmission.title);
  formData.append("description", bookSubmission.description);
  formData.append("thumbnail", bookSubmission.thumbnail);
  bookSubmission.creators.forEach((creator, index) => {
    formData.append(`creators[${index}].fullName`, creator.fullName);
  });
  
  const response = await fetch('/api/book', {
    method: 'PUT',
    body: formData
  });

  return await handleResponse<Book>(response);
}
