import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) { }

    login = (username: string, password: string) => {
      const body = { username, password };
      return this.http.post<User>('/api/login', body);
    }

    logout = () => {
      return this.http.post('/api/logout', undefined);
    }

    getCurrentUser = () => {
      return this.http.get<User>('/api/user/self');
    }

    register = (user: User) => {
      return this.http.post('/api/register', user); 
    }

    confirmRegistration = (token: string) => {
      return this.http.post(`/api/user/confirm`, { token });
    }

    recreateVerificationToken = (token: string) => {
      return this.http.post(`/api/user/verification-token/recreateToken`, { token });
    }

    find = (params: HttpParams) => {
      return this.http.get<User[]>(`/api/user`, { params });
    }
}