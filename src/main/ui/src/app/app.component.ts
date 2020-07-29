import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { Principal } from './entity/principal';
import { BookSummary } from './entity/book-summary';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { BookService } from './service/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-browser';

  username: string;
  password: string;
  principal: Principal;
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

  getSearchResultCreatorsDescription(result: BookSummary) {
    let creatorsDescription = '';
    result.creators.forEach((creator, index) => {
      creatorsDescription += `${creator.firstName} ${creator.lastName}`;
      if (index + 1 != result.creators.length) {
        creatorsDescription += ' , ';
      }
    });
    return creatorsDescription;  
  }
}
