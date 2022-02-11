import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from './feedback/feedback.model';

const URL = "";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient ) { }

  getFeedback(): Observable<any> {
    return this.http.get(`${URL}`);
  }

  createFeedback(newFeedback: Feedback): Observable<any>{
    return this.http.post(`${URL}/`, newFeedback);
  }
}
