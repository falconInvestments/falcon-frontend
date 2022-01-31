import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'https://falconinvestments.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
  getUsers(): Observable<any> {
    return this.http.get(baseUrl + '/users')
  }
}
