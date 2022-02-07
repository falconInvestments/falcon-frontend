
import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { StocksService } from "../stock.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Stock } from '../stock.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AccountService } from '../account.service';
import { UserStoreService } from '../user-store.service';
import { User } from '../user.model';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  isLoadingStocks: boolean = false;
  cartData:any[] =[];
  stocks:any[] = [];
  name:any;
  // userStocks: any[] =[];
  newStock: any = {id: 0, name: '', symbol: '',price: 0, accountId: 0};
  filteredStocks: any[] = []
  filteredStock: any = {id: 0, name: '', symbol: '',price: 0, isUsed: false};
  dataSource!: MatTableDataSource<any[]>;
  accountId: number = 0;
  userToGreet: User | null= null; 
  account: any = {}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatPaginator) dataSource!: MatTableDataSource<Stock>;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private stockService: StocksService,
              private _liveAnncouncer: LiveAnnouncer,
              private accountService: AccountService,
              private userStore: UserStoreService,
              private route: ActivatedRoute,) {}


  ngOnInit(): void {
   this.getAccountId();
    this.stockService.getStocks().subscribe(payload => {
      this.isLoadingStocks = true;
      this.stocks = payload;
      for (let i = 0; i < this.stocks.length; i++) {
        this.filteredStock = {id: 0, name: '', symbol: '', price: 0, isUsed: false }
        for (let key in this.stocks[i]) {
          if (this.filteredStock.hasOwnProperty(key)) {
            this.filteredStock[key] = this.stocks[i][key]
          }
        }
        this.filteredStocks.push(this.filteredStock)
      }
      console.log(this.filteredStocks)
      this.dataSource = new MatTableDataSource(this.filteredStocks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingStocks = false;
    });
  }
  
  displayedColumns: string[] = ['stockname', 'symbol', 'price', "isUsed"];
  
  getAccountId(): void {
    this.userStore.currentUser$.subscribe((response) => {
       this.userToGreet = response;
    });
    this.accountService.getAccounts().subscribe(payload =>{
      this.account = payload.find((acc: { newUserId: number; }) => this.userToGreet ? acc.newUserId == this.userToGreet.id : acc.newUserId == 99);
      this.accountId = this.account.id;
      console.log(this.accountId)
    })
    
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnncouncer.announce(`Sorted${sortState.direction}ending`);
    } else {
      this._liveAnncouncer.announce('Sorting cleared');
    }
  }
  
  //adding to cart makes a this.stocks if value[i].name already exists on this.stocks, just continue, else, add it in
  
  addToCart(id: number) {
    this.newStock.id = id;
    console.log(this.newStock)
    for (let [key, value] of Object.entries(this.filteredStocks.find(stock => stock.id === id ))) {
      switch (key){
        case 'name':
          this.newStock.name = String(value);
          break;
          case 'symbol':
            this.newStock.symbol = String(value);
            break;
            case 'price':
              this.newStock.price = Number(value);
              break;
            }
          }
          this.filteredStocks.find(stock => stock.id === id).isUsed = true;
          this.stockService.createUserStock(this.newStock).subscribe(data => {
            this.cartData.push(data)
          })
          console.log(this.cartData)
        }
        
}
