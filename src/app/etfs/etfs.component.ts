import { Component, OnInit } from '@angular/core';
import { Etf } from '../etf.model';
import { EtfService } from '../etf.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AccountService } from '../account.service';
import { Investment } from '../investment.model';
import { UserStoreService } from '../user-store.service';
import { User } from '../user.model';
import { Account } from '../account.model';
import { FilteredFund } from '../filtered-fund.model';


@Component({
  selector: 'app-etfs',
  templateUrl: './etfs.component.html',
  styleUrls: ['./etfs.component.scss']
})
export class EtfsComponent implements OnInit {
  filteredFunds: any[] = [];
  filteredFund: any = {id: 0, fundName: '', symbol: '', inceptionDate: '', expenseRatio: 0, nAV: 0, isUsed: false }
  investments:any[] = [];
  newInvestment: Investment = {name: '', type: 'ETF', symbol: '', expenseRatio: 0, nAV: 0, inceptionDate: '', accountId: 2};
  userToGreet: User | null= null; 
  accounts: Account[] | any = [];
  accountId: number = 0;


  dataSource = new MatTableDataSource<FilteredFund[]>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  etfs: any[] = [];
  displayedColumns: string[] = ['name', 'ticker', 'asset', 'price', 'portfolio' ]


  constructor(private eftService: EtfService,
              private userStore: UserStoreService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.getInvestments();
    this.eftService.getEtfs().subscribe((res) => {
      this.etfs = res;
      for (let i = 0; i < this.etfs.length; i++) {
        this.filteredFund = {id: 0, fundName: '', symbol: '', inceptionDate: '', expenseRatio: 0, nAV: 0, isUsed: false }
        for (let key in this.etfs[i]) {
          if (this.filteredFund.hasOwnProperty(key)) {
            this.filteredFund[key] = this.etfs[i][key]
          }
        }
        for (let j = 0; j < this.investments.length; j++){
          if(this.etfs[i].fundName == this.investments[j].name) {
            this.filteredFund.isUsed = true;
          } 
        }
        this.filteredFunds.push(this.filteredFund)
      }
      
      
      // this.etfs = res;
      this.dataSource = new MatTableDataSource(this.filteredFunds);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  getInvestments(): void {
    this.userStore.currentUser$.subscribe((response) => {
       this.userToGreet = response;
    });
    this.accountService.getAccounts().subscribe(payload =>{
      this.accounts = payload.find((acc: { newUserId: number; }) => this.userToGreet ? acc.newUserId == this.userToGreet.id : acc.newUserId == 99);
      this.accountId = this.accounts.id;
      this.investments = this.accounts.investments;
    })

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  addInvestment(fundId: number) {
    this.newInvestment.accountId = this.accountId;
    for (let [key, value] of Object.entries(this.filteredFunds.find(x => x.id === fundId))) {
      switch (key){
        case 'fundName':
          this.newInvestment.name = String(value);
          break;
        case 'symbol':
          this.newInvestment.symbol = String(value);
          break;
        case 'expenseRatio':
          this.newInvestment.expenseRatio = Number(value);
          break;
        case 'nAV':
          this.newInvestment.nAV = Number(value);
          break;
        case 'inceptionDate':
          this.newInvestment.inceptionDate = String(value);
          break;
      }
    }
    this.filteredFunds.find(x => x.mf_id === fundId).isUsed = true;
    this.accountService.createInvestment(this.newInvestment).subscribe(data => {
      if(data) {
        console.log(data);
      }
    })
  }

}
