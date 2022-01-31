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
}
