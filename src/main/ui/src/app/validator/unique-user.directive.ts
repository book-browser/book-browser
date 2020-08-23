import { Directive, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl, ValidationErrors, AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Observable, of } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[uniqueUser]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUserDirective, multi: true}]
})
export class UniqueUserDirective implements AsyncValidator {
  @Input('uniqueUser') expectedValue: any;

  _onChange: () => void;

  constructor(private userService: UserService) { }
  
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(500),
      switchMap((val) => this.userService.find({ [this.expectedValue]: val} as any)
      .pipe(
        map((users) => (users.length === 1 ? { uniqueUser: 'value is taken'} : null ) as any),
        )));
  }
}
