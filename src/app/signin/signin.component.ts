import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  isLoadingAuth: boolean = false;
  currentUserId: number = NaN;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const signinSubscription = this.userService
      .submitSignin(form.value)
      .subscribe((response) => {
        this.cookieService.set('falcon.sid', JSON.stringify(response));
        if (response.userId) {
          this.userService.fetchUserDetails(response.userId);
          signinSubscription.unsubscribe();
          this.isLoadingAuth = true;
          setTimeout(() => this.router.navigate(['/dashboard']), 1000); // Timeout to prevent automatic re-redirection to /signin
        }
      });
  }
}
