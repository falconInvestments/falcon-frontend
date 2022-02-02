import { formatPercent } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Certificate } from '../certificate.model';
import { CertificateService } from '../certificate.service';
import { UserStoreService } from '../user-store.service';

const { DateTime } = require('luxon');

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {
  today = new FormControl(new Date());
  certificateName: string = '';
  initialAmount: number = 1000;
  lengthOfCd: number = 1;
  APY: number = 0.05;
  rateToDisplay: string = '0.05%';
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

  buyCD(): void {
    // Confirmation before submission

    const maturityDate = DateTime.local(
      this.today.value.getFullYear(),
      this.today.value.getMonth(),
      this.today.value.getDate()
    ).plus({ months: this.lengthOfCd });

    if (this.userStore.currentUser && this.userStore.currentUser.id) {
      if (this.certificateName) {
        this.certificateService
          .addCertificate(
            this.initialAmount,
            this.APY,
            this.today.value,
            maturityDate,
            this.userStore.currentUser.id,
            this.certificateName
          )
          .subscribe();
      } else {
        this.certificateService
          .addCertificate(
            this.initialAmount,
            this.APY,
            this.today.value,
            maturityDate,
            this.userStore.currentUser.id
          )
          .subscribe();
      }
    } else {
      // Error; should be logged in on this component
    }
  }

  updateInterest(): void {
    if (this.lengthOfCd >= 1 && this.lengthOfCd < 4) {
      this.APY = 0.0005;
    } else if (this.lengthOfCd >= 4 && this.lengthOfCd < 10) {
      this.APY = 0.001;
    } else if (this.lengthOfCd >= 10 && this.lengthOfCd < 13) {
      this.APY = 0.0015;
    } else if (this.lengthOfCd >= 13 && this.lengthOfCd < 24) {
      this.APY = 0.0025;
    } else if (this.lengthOfCd >= 24 && this.lengthOfCd < 36) {
      this.APY = 0.0045;
    } else if (this.lengthOfCd >= 36 && this.lengthOfCd < 48) {
      this.APY = 0.007;
    } else if (this.lengthOfCd >= 48 && this.lengthOfCd < 60) {
      this.APY = 0.0075;
    } else if (this.lengthOfCd >= 60 && this.lengthOfCd < 84) {
      this.APY = 0.011;
    } else if (this.lengthOfCd >= 84 && this.lengthOfCd < 120) {
      this.APY = 0.0095;
    } else if (this.lengthOfCd >= 120) {
      this.APY = 0.0185;
    } /* else {
      // This would be an error
    }
    */
    this.rateToDisplay = formatPercent(this.APY, 'en-US', '1.2-3');
  }
}
