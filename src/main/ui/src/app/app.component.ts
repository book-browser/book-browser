import { Component, ViewChild } from '@angular/core';
import { UserService } from './service/user.service';
import { BookSummary } from './entity/book-summary';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { BookService } from './service/book.service';
import { User } from './entity/user';
import { FormsModule, NgForm } from '@angular/forms'; 
import { ApiError } from './entity/api-error';
import { ErrorCode } from './entity/error-code.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-browser';

  username: string;
  password: string;
  user: User;
  searching = false;
  searchFailed = false;
  displayVerificationAlert = true;
  query: string;

  @ViewChild('f') loginForm : NgForm;
  loginErrorMessage: string;
  
  constructor(private userService: UserService, private bookService: BookService, private router: Router) { }

  ngOnInit() { 
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });

    $('#loginModal').on('hidden.bs.modal', () => {
      this.loginForm.reset();
      this.loginErrorMessage = null;
    });
  }

  login(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;
      this.userService.login(username, password).subscribe((user) => {
        this.user = user;
        $('#loginModal').modal('hide');
      }, (errorResponse: HttpErrorResponse) => {
        const error: ApiError = errorResponse.error;
        if (error.code === ErrorCode.USERNAME_NOT_FOUND) {
          this.loginErrorMessage = 'User with username not found';
        } else if (error.code === ErrorCode.INCORRECT_PASSWORD) {
          this.loginErrorMessage = 'The password is incorrect';
        }
      });
    }
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.user = null;
    });
  }

  displayShortSearchResults = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => {
        if (term) {
          return this.bookService.search(term, 10).pipe(
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

  search = () => {
    if (this.query.length > 0) {
      this.router.navigateByUrl(`/search?query=${this.query}`);
    }
  }

  navigateToBook = (book: BookSummary) => {
    this.router.navigateByUrl(`/book/${book.id}`);
    setTimeout(() => {
      this.query = "";
    });
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

  closeVerificationAlert() {
    this.displayVerificationAlert = false;
  }
}
