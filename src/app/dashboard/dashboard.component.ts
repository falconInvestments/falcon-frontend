import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account.model';
import { Investment } from '../investment.model';
import { UserStoreService } from '../user-store.service';
import { User } from '../user.model';
import { Certificate } from '../certificate.model';
import { CertificateService } from '../certificate.service';

const { DateTime } = require('luxon');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLoadingUser: boolean = false;
  isLoadingAccounts: boolean = false;
  isLoadingCertificates: boolean = false;
  userToGreet: User | null = null;
  accounts: Account[] | any = [];
  investments: Investment[] = [];
  users: User[] = [];
  certificates: Certificate[] = [];

  constructor(
    private userStore: UserStoreService,
    private accountService: AccountService,
    private certificateService: CertificateService
  ) {}

  private stateCertsSubscription: any;

  ngOnInit(): void {
    this.userStore.currentUser$.subscribe((response) => {
      this.isLoadingUser = true;
      if (response) {
        this.userToGreet = response;
        this.certificateService.fetchUserCertificates(response.id);
        this.isLoadingUser = false;
      }
    });
    this.accountService.getAccounts().subscribe((payload) => {
      this.isLoadingAccounts = true;
      this.accounts = payload.find((acc: { newUserId: number }) =>
        this.userToGreet
          ? acc.newUserId == this.userToGreet.id
          : acc.newUserId == 99
      );
      this.investments = this.accounts.investments;
      this.isLoadingAccounts = false;
    });
    this.stateCertsSubscription =
      this.certificateService.userCertificates$.subscribe((certificates) => {
        this.isLoadingCertificates = true;
        if (certificates.length > 0) {
          this.certificates = certificates;
          this.stateCertsSubscription.unsubscribe();
          this.isLoadingCertificates = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.stateCertsSubscription.unsubscribe();
  }

  deleteInvestment(id: number | undefined, index: number) {
    this.accountService.deleteInvestment(id).subscribe();
    this.investments.splice(index, 1);
  }

  convertDatesToMonths(start: Date, end: Date) {
    const startDate = DateTime.fromISO(start);
    const endDate = DateTime.fromISO(end);
    return endDate.diff(startDate, 'months').values.months;
  }

  calcTimeRemaining(end: Date) {
    const startDate = DateTime.fromJSDate(new Date());
    const endDate = DateTime.fromISO(end);

    return endDate
      .diff(startDate, ['years', 'months'])
      .toHuman({ floor: true });
  }
}
