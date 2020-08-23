import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-verify',
  templateUrl: './user-verify.component.html',
  styleUrls: ['./user-verify.component.scss']
})
export class UserVerifyComponent implements OnInit {
  success = false;
  expired = false;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const verificationToken = params['verification-token'];
      this.userService.confirmRegistration(verificationToken)
          .subscribe(() => {
            this.success = true;
          }, (error) => {
            console.log('error', error);
          });
    })
  }

}
