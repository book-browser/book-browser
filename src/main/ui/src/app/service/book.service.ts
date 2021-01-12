import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookSummary } from '../entity/book-summary';
import { Book } from '../entity/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
    constructor(private http: HttpClient) { }

    findById(id: number) {
      return this.http.get<Book>(`/api/book/${id}`);
    }

    search(query: string, limit?: number) {
      const body = { query };
      let  params = new HttpParams();
      if (limit) {
        params = params.append('limit', `${limit}`);
      }
      return this.http.post<BookSummary[]>('/api/books/search', body, { params });
    }

    findNewBooks() {
      return this.http.get<BookSummary[]>('/api/books/new');
    }

    save(book: Book) {
      return this.http.put('/api/book', book);
    }
}