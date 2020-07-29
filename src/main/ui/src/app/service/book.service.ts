import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    findByTitleContaining(title: string) {
      const body = { query: title }
        
      return this.http.post<BookSummary[]>('/api/books/search', body);
    }

    findNewBooks() {
      return this.http.get<BookSummary[]>('/api/books/new');
    }
}