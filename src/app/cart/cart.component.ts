import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { StocksService } from '../stock.service';
import { StocksComponent } from '../stocks/stocks.component';
import { Account } from '../account.model';
import { Stock } from '../stock.model';
import { UserStoreService } from '../user-store.service';
import { User } from '../user.model';
import { CounterComponent } from '../counter/counter.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  initialCount: number = 1;

@Input()

userToGreet: User | null= null;  
accounts: Account[] | any = [];
  stocks: Stock[] = [];
  users: User[] = [];
  
  constructor(
    private userStore: UserStoreService,
    private accountService: AccountService,
    private stocksService: StocksService
  ) { }

  ngOnInit(): void {
    this.userStore.currentUser$.subscribe((response) => {
      this.userToGreet = response;
    });
    this.stocksService.getUserStocks().subscribe(payload =>{
      this.stocks = payload.find((acc: { newUserId: number; }) => this.userToGreet ? acc.newUserId == this.userToGreet.id : acc.newUserId == 99);

    })
  }


  deleteStock(id: number | undefined, index: number) {
    this.stocksService.deleteUserStock(id).subscribe();
    this.stocks.splice(index, 1);
  }

}
