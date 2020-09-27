import { Component } from '@angular/core';
import { User } from 'src/app/entity/user';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from 'src/app/entity/api-error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registering = false;
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.registering = true;
      this.userService.register(form.value as User)
          .subscribe(() => {
            this.router.navigateByUrl('/register/success');
          }, (errorResponse: HttpErrorResponse) => {
            this.registering = false;
            const error: ApiError = errorResponse.error;
            if (error.status === 500) {
              this.errorMessage = 'Something went wrong';
            }
          });
    }
  }
}
