import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStoreService } from './user-store.service';

const baseUrl = 'https://falconinvestments.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private userStore: UserStoreService) {}

  submitSignup(formValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(baseUrl + '/signup', formValues);
  }

  submitSignin(formValues: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(baseUrl + '/signin', formValues);
  }

  fetchUserDetails(userId: number) {
    const fetchUserSubscription = this.http
      .get(baseUrl + '/users/' + userId.toString())
      .subscribe((response: any) => {
        if (response.email) {
          this.userStore.setCurrentUser(response);
          fetchUserSubscription.unsubscribe();
        }
      });
  }
}
