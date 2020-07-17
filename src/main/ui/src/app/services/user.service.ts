import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Principal } from '../entities/principal';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient, private cookieService: CookieService) { }

    login(username: string, password: string) {
      const body = { username, password };
      return this.http.post<Principal>('/api/login', body);
    }

    logout() {
      this.cookieService.delete("JSESSIONID");
    }

    getPrincipal() {
      return this.http.get<Principal>('/api/principal');
    }

}