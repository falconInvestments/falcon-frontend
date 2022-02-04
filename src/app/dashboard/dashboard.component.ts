import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account.model';
import { Investment } from '../investment.model';
import { UserStoreService } from '../user-store.service';
import { User } from '../user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

userToGreet: User | null= null;  
accounts: Account[] | any = [];
  investments: Investment[] = [];
  users: User[] = [];

  constructor(
    private userStore: UserStoreService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.userStore.currentUser$.subscribe((response) => {
      this.userToGreet = response;
    });
    this.accountService.getAccounts().subscribe(payload =>{
      this.accounts = payload.find((acc: { newUserId: number; }) => this.userToGreet ? acc.newUserId == this.userToGreet.id : acc.newUserId == 99);
      this.investments = this.accounts.investments;
    })
  }


  deleteInvestment(id: number | undefined, index: number) {
    this.accountService.deleteInvestment(id).subscribe();
    this.investments.splice(index, 1);
  }

}
