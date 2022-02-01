import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
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

userToGreet: User | null = null;  
accounts: Account[] = [];
  investments: Investment[] = [];
  users: User[] = [];

  constructor(
    private userStore: UserStoreService,
    private route:ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userStore.currentUser$.subscribe((response) => {
      this.userToGreet = response;
    });
    this.route.params.subscribe(params=>{
      const myid = +params['id'];
      this.userService.getUsers().subscribe(payload => {
        this.users = payload;
      })})
    this.accountService.getAccounts().subscribe(payload =>{
      this.accounts = payload;
      this.investments = payload[1].investments;
    })
  }


  deleteInvestment(id: number | undefined, index: number) {
    this.accountService.deleteInvestment(id).subscribe();
    this.investments.splice(index, 1);
  }

}
