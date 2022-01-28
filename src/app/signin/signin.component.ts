import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.userService.submitSignin(form.value).subscribe((response) => {
      this.cookieService.set('falcon.sid', JSON.stringify(response));
    });
  }
}
