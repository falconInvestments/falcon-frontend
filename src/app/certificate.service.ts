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

  addCertificate(newCertObj: {
    name: string | null;
    initialAmount: number;
    interestRate: number;
    startDate: Date;
    maturityDate: Date;
    userId: number;
  }): Observable<any> {
    return this.http.post(certificatesUrl, newCertObj);
  }
}
