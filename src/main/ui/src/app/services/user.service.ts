import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Principal } from '../entities/principal';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
      const payload = new HttpParams()
      .set('username', username)
      .set('password', password);
        
      return this.http.post<Principal>('/api/login', payload);
    }

    getPrincipal() {
      return this.http.get<Principal>('/api/principal');
    }

}