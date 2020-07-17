import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Principal } from '../entities/principal';
import { Observable, of } from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { BookService } from '../services/book.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  username: string;
  password: string;
  principal: Principal;
  model: string;
  searching = false;
  searchFailed = false;

  constructor(private userService: UserService, private bookService: BookService) { }

  ngOnInit() { 
    this.userService.getPrincipal().subscribe((principal) => {
      this.principal = principal;
    });
  }

  login() {
    this.userService.login(this.username, this.password).subscribe((principal) => {
      this.principal = principal;
    });
  }

  logout() {
    setTimeout(() => {
      this.userService.logout();
      this.principal = null;
    });
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.bookService.findByTitleContaining(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
  };   
}
