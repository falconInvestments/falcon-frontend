import { Component, OnInit, ViewChild } from '@angular/core';
import { MutualFundsService } from '../mutual-funds.service';
import { MutualFund } from './mutual-fund.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-mutual-funds',
  templateUrl: './mutual-funds.component.html',
  styleUrls: ['./mutual-funds.component.scss']
})
export class MutualFundsComponent implements OnInit {
  newArr: any[] = [];

 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) dataSource!: MatTableDataSource<MutualFund>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private mutualFundService: MutualFundsService,
              private _liveAnncouncer: LiveAnnouncer) {}

  mutualFunds:any[] = [];

  ngOnInit(): void {
    this.mutualFundService.getMutualFunds().subscribe(payload => {
      this.mutualFunds = payload;
      this.dataSource = new MatTableDataSource(this.mutualFunds);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

 // columns = [
  //  {columnDef: 'fundName', sortBy: 'Sort by header', cell: (element: any) => `${element.fundName}`},
  //  {columnDef: 'symbol',  sortBy: 'Sort by symbol', cell: (element: any) => `${element.symbol}`},
    // {columnDef: 'yTD',   sortBy: 'Sort by yTD', cell: (element: any) => `${element.yTD}`},
    // {columnDef: 'yearOne',  sortBy: 'Sort by yearOne',  cell: (element: any) => `${element.yearOne}`},
    // {columnDef: 'yearThree',  sortBy: 'Sort by yearThree',  cell: (element: any) => `${element.yearThree}`},
    // {columnDef: 'yearFive',  sortBy: 'Sort by yearFive',  cell: (element: any) => `${element.yearThree}`},
    // {columnDef: 'yearTen',  sortBy: 'Sort by yearTen',  cell: (element: any) => `${element.yearTen}`},
 // {columnDef: 'inceptionDate',  sortBy: 'Sort by inceptionDate',  cell: (element: any) => `${element.inceptionDate}`},
    // {columnDef: 'inceptionRate',  sortBy: 'Sort by inceptionRate',  cell: (element: any) => `${element.inceptionRate}`},
    // {columnDef: 'expenseRatio', sortBy: 'Sort by expenseRatio',  cell: (element: any) => `${element.expenseRatio}`},
    // {columnDef: 'nAV', sortBy: 'Sort by nAV',  cell: (element: any) => `${element.nAV}`},
    // {columnDef: 'risk', sortBy: 'Sort by risk',  cell: (element: any) => `${element.risk}`},
    // {columnDef: 'minimum', sortBy: 'Sort by minimum',  cell: (element: any) => `$ ${element.minimum}`},
    // {columnDef: 'action'},
 // ];

  // displayedColumns = this.columns.map(c => c.columnDef);
  displayedColumns: string[] = ['fundName', 'symbol', 'inceptionDate', 'expenseRatio', "naV", "action"];
  // dataSource = this.mutualFunds;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnncouncer.announce(`Sorted${sortState.direction}ending`);
    } else {
      this._liveAnncouncer.announce('Sorting cleared');
    }
  }
  addInvestment(index: number) {

  }
}
