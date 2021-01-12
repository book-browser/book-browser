import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../entity/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) { }

  search(query: string) {
    const body = { query };
    return this.http.post<Person[]>('/api/persons/search', body);
  }
}