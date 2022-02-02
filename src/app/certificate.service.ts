import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const certificatesUrl =
  'https://capstone-certificates.herokuapp.com/api/certificates';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getUserCertificates(): Observable<any> {
    return this.http.get(certificatesUrl);
  }

  addCertificate(
    initialAmount: number,
    interestRate: number,
    startDate: Date,
    maturityDate: Date,
    userId: number,
    name?: string
  ): Observable<any> {
    if (name) {
      return this.http.post(certificatesUrl, {
        name,
        initialAmount: initialAmount,
        interestRate: interestRate,
        startDate: startDate,
        maturityDate: maturityDate,
        userId,
      });
    } else {
      return this.http.post(certificatesUrl, {
        initialAmount: initialAmount,
        interestRate: interestRate,
        startDate: startDate,
        maturityDate: maturityDate,
        userId,
      });
    }
  }
}
