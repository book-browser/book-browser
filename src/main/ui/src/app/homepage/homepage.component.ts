import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Principal } from '../entity/principal';
import { Observable, of } from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { BookService } from '../service/book.service';
import { Person } from '../entity/person';
import { Book } from '../entity/book';
import { Release } from '../entity/release';
import { ReleaseService } from '../service/release.service';

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
  releases: Release[][];



  constructor(private userService: UserService, private bookService: BookService,
    private releaseService: ReleaseService) { }

  ngOnInit() { 
    this.userService.getPrincipal().subscribe((principal) => {
      this.principal = principal;
    });
    this.releaseService.getReleases().subscribe((releases) => {
      this.releases = [];
      for (var i = 0; i < releases.length / 15; i++) {
        this.releases.push(releases.slice(i * 15, (i + 1) * 15));
      }
    })
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
      switchMap(term => {
        if (term) {
          return this.bookService.findByTitleContaining(term).pipe(
            tap(() => this.searchFailed = false),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            }))
          }
          return of([]);
        }
      ),
      tap(() => this.searching = false)
    )
  }
  
  getSearchResultAuthorsDescription(result: Book) {
    let authorsDescription = '';
    result.authors.forEach((author, index) => {
      authorsDescription += `${author.firstName} ${author.lastName}`;
      if (index + 1 != result.authors.length) {
        authorsDescription += ' , ';
      }
    });
    return authorsDescription;  
  }
}
