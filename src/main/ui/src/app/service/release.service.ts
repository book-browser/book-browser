import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Release } from '../entity/release';

@Injectable({
  providedIn: 'root',
})
export class ReleaseService {
    constructor(private http: HttpClient) { }

    getReleases() {
      return this.http.get<Release[]>('/api/releases');
    }
}