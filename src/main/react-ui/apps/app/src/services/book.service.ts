import { Book } from 'types/book';
import { Genre } from 'types/genre';
import { Letter } from 'types/letter';
import { mapPageItems, Page } from 'types/page';
import { getFileBase64 } from 'utils/file-utils';
import { handleResponse } from './response.service';

type BookDto = Book & {
  releaseDate?: string;
};

export const saveBook = async (book: Book) => {
  const response = await fetch('/api/book', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(await mapBookToBookDto(book))
  });

  return convertBookResponseToBook(await handleResponse(response));
};

const mapBookToBookDto = async (book: Book) => {
  return {
    ...book,
    thumbnail: book.thumbnail ? await getFileBase64(book.thumbnail as File) : book.thumbnail
  };
};

export const getById = async (id: number) => {
  const response = await fetch(`/api/book/${id}`);
  return convertBookResponseToBook(await handleResponse(response));
};

export const search = async ({
  query,
  genres,
  page,
  limit
}: {
  query?: string;
  genres?: Genre[];
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();

  if (query) {
    params.append('query', query);
  }
  if (page) {
    params.append('page', `${page}`);
  }
  if (limit) {
    params.append('limit', `${limit}`);
  }
  if (genres) {
    genres.map((genre) => genre.name).forEach((genreName) => params.append('genres', genreName));
  }

  const response = await fetch('/api/books/search?' + params.toString());
  return (await handleResponse<BookDto[]>(response)).map(convertBookResponseToBook);
};

export const findAllBooks = async ({
  query,
  limit,
  page,
  sort,
  order,
  genres,
  startReleaseDate,
  endReleaseDate,
  titleStartsWith
}: {
  query?: string;
  page?: number;
  limit?: number;
  sort?: keyof Book;
  order?: 'asc' | 'desc';
  genres?: Genre[];
  startReleaseDate?: Date;
  endReleaseDate?: Date;
  titleStartsWith?: Letter;
}) => {
  const params = new URLSearchParams();

  if (query) {
    params.append('query', `${query}`);
  }
  if (page) {
    params.append('page', `${page}`);
  }
  if (limit) {
    params.append('limit', `${limit}`);
  }
  if (sort) {
    params.append('sort', sort);
  }
  if (order) {
    params.append('order', order);
  }
  if (genres) {
    genres.map((genre) => genre.name).forEach((genreName) => params.append('genres', genreName));
  }
  if (startReleaseDate) {
    params.append('startReleaseDate', startReleaseDate.toISOString().substring(0, 10));
  }
  if (endReleaseDate) {
    params.append('endReleaseDate', endReleaseDate.toISOString().substring(0, 10));
  }
  if (titleStartsWith) {
    params.append('titleStartsWith', titleStartsWith.value);
  }

  const response = await fetch('/api/books?' + params.toString());
  return mapPageItems(await handleResponse<Page<BookDto>>(response), convertBookResponseToBook);
};

const convertBookResponseToBook = (data: BookDto) => {
  return {
    ...data,
    releaseDate: data.releaseDate && new Date(data.releaseDate)
  } as Book;
};
