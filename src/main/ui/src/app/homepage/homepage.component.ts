import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Principal } from '../entities/principal';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  username: string;
  password: string;
  principal: Principal;

  constructor(private userService: UserService) { }

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
}
