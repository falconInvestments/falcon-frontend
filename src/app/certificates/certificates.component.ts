import { Component, OnInit } from '@angular/core';
import { Certificate } from '../certificate.model';
import { CertificateService } from '../certificate.service';
import { UserStoreService } from '../user-store.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  userCertificates: Certificate[] = [];

  constructor(
    private userStore: UserStoreService,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    if (this.userStore.currentUser && this.userStore.currentUser.id) {
      let userId = this.userStore.currentUser.id;
      const certificateSubscription = this.certificateService
        .getUserCertificates()
        .subscribe((response) => {
          if (Array.isArray(response)) {
            this.userCertificates = response.filter(
              (certificate) => certificate.userId === userId
            );
            console.log(this.userCertificates);
            certificateSubscription.unsubscribe();
          }
        });
    }
  }
}
