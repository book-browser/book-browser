import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookRelease } from '../entity/book-release';

@Injectable({
  providedIn: 'root',
})
export class ReleaseService {
    constructor(private http: HttpClient) { }

    getReleases() {
      return this.http.get<BookRelease[]>('/api/releases');
    }
}