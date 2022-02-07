import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { StocksService } from '../stock.service';
import { StocksComponent } from '../stocks/stocks.component';
import { Account } from '../account.model';
import { Stock } from '../stock.model';
import { UserStoreService } from '../user-store.service';
import { User } from '../user.model';
import { CounterComponent } from '../counter/counter.component';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
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
  stocks:any[] = [];
  users: User[] = [];
  filteredStocks: any[] = [];

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
      
      this.stocks = payload
      // this.stocks = payload.find((acc: { newUserId: number; }) => this.userToGreet ? acc.newUserId == this.userToGreet.id : acc.newUserId == 99);
    })
    this.calculateTotal()
  }
  
  removeDuplicates(): any {
    this.stocks.forEach((item) => {
      if(this.stocks.indexOf(item < 0)) {
        console.log(item)
        this.filteredStocks.push(item)
        console.log(this.filteredStocks)
        console.log(this.stocks)
      }

      return this.stocks
    })
}

  deleteStock(id: number | undefined, index: number) {
    this.stocksService.deleteUserStock(id).subscribe();
    this.stocks.splice(index, 1);
  }

  calculateTotal(){
    let total = 0
    if(this.stocks){

      for(let i = 0; i<this.stocks.length; i++) {
        total = total +  this.stocks[i].price
      };
  
    }
    return total
  }
    
}