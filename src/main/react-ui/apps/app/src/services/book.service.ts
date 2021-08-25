import { Book } from "types/book";
import { BookSubmission } from "types/book-submission";
import { handleResponse } from "./response.service";

export const createBook = async (bookSubmission: BookSubmission) => {
  console.log(bookSubmission);
  const formData = new FormData();
  formData.append("title", bookSubmission.title);
  formData.append("description", bookSubmission.description);
  formData.append("thumbnail", bookSubmission.thumbnail);
  bookSubmission.creators.forEach((creator, index) => {
    formData.append(`creators[${index}].fullName`, creator.fullName);
    if (creator.id) {
      formData.append(`creators[${index}].id`, `${creator.id}`);
    }
    if (creator.role) {
      formData.append(`creators[${index}].role`, creator.role);
    }
  });
  bookSubmission.genres.forEach((genre, index) => {
    formData.append(`genres[${index}].id`, `${genre.id}`);
    formData.append(`genres[${index}].name`, genre.name);
  });

  bookSubmission.links.forEach((link, index) => {
    if (link.id) {
      formData.append(`links[${index}].id`, `${link.id}`);
    }
    formData.append(`links[${index}].url`, `${link.url}`);
    formData.append(`links[${index}].description`, `${link.description}`);
  });
  
  console.log(formData);

  const response = await fetch('/api/book', {
    method: 'PUT',
    body: formData
  });

  return await handleResponse<Book>(response);
}

export const getById = async (id: number) => {
  const response = await fetch(`/api/book/${id}`);
  return await handleResponse<Book>(response);
}

export const search = async(query: string) => {
  const response = await fetch('/api/book/search?' + new URLSearchParams({
    query
  }));
  return await handleResponse<Book[]>(response);
}
