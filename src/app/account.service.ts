import { Injectable } from '@angular/core';
import { Account } from './account.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://pg-new-db.herokuapp.com/';
  }

  getAccounts(): Observable<any> {
    return this.http.get<any>(this.url + 'accounts');
  }

  getInvestments():Observable<any>{
    return this.http.get(this.url + 'investments');
  }
  
  deleteInvestment(id: number | undefined): Observable<any> {
    return this.http.delete(this.url + 'investments/' + id)
  }

  createInvestment(newInvestment: Object): Observable<any>{
    return this.http.post<any>(this.url + 'investments/', newInvestment);
  }
  
}
