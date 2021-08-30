import { Book } from "types/book";
import { BookSubmission } from "types/book-submission";
import { Genre } from "types/genre";
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

export const search = async({ query, genres }: 
  { 
    query?: string,
    genres?: Genre[],
  }) => {

  const params = new URLSearchParams();

  if (query) {
    params.append('query', query);
  }

  if (genres) {
    genres.map((genre) => genre.name)
          .forEach((genreName) => params.append('genres', genreName));
  }

  const response = await fetch('/api/book/search?' + params.toString());
  return await handleResponse<Book[]>(response);
}
