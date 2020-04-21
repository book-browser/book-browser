import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../entities/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
    constructor(private http: HttpClient) { }

    findByTitleContaining(title: string) {
      const body = { query: title }
        
      return this.http.post<Book[]>('/api/books/search', body);
    }
}