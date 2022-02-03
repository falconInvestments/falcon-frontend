import { formatPercent } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Certificate } from '../certificate.model';
import { CertificateService } from '../certificate.service';
import { UserStoreService } from '../user-store.service';

const { DateTime } = require('luxon');

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit, OnDestroy {
  today = new FormControl(new Date());
  certificateName: string = '';
  initialAmount: number = 1000;
  lengthOfCd: number = 1;
  APY: number = 0.05;
  rateToDisplay: string = '0.05%';
  userCertificates: Certificate[] = [];

  constructor(
    private userStore: UserStoreService,
    private certificateService: CertificateService,
    private router: Router
  ) {}

  private getCertificatesSubscription: any;

  ngOnInit(): void {
    if (this.userStore.currentUser && this.userStore.currentUser.id) {
      let userId = this.userStore.currentUser.id;
      this.getCertificatesSubscription = this.certificateService
        .getUserCertificates()
        .subscribe((response) => {
          if (Array.isArray(response)) {
            this.userCertificates = response.filter(
              (certificate) => certificate.userId === userId
            );
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.getCertificatesSubscription.unsubscribe();
  }

  // Must be refactored for less repetition
  buyCD(): void {
    // Confirmation before submission

    this.router.onSameUrlNavigation = 'reload';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const maturityDate = DateTime.local(
      this.today.value.getFullYear(),
      this.today.value.getMonth(),
      this.today.value.getDate()
    ).plus({ months: this.lengthOfCd });

    if (this.userStore.currentUser && this.userStore.currentUser.id) {
      if (this.certificateName) {
        const newCertificateSubscription = this.certificateService
          .addCertificate(
            this.initialAmount,
            this.APY,
            this.today.value,
            maturityDate,
            this.userStore.currentUser.id,
            this.certificateName
          )
          .subscribe((response) => {
            newCertificateSubscription.unsubscribe();
            this.router.navigate(['/certificates']);
          });
      } else {
        const newCertificateSubscription = this.certificateService
          .addCertificate(
            this.initialAmount,
            this.APY,
            this.today.value,
            maturityDate,
            this.userStore.currentUser.id
          )
          .subscribe((response) => {
            newCertificateSubscription.unsubscribe();
            this.router.navigate(['/certificates']);
          });
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
