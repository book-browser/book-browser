import { Component } from '@angular/core';
import { User } from 'src/app/entity/user';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registering = false;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.registering = true;
      this.userService.register(form.value as User)
          .subscribe(() => {
            this.router.navigateByUrl('/register/success');
          });
    }
  }
}
