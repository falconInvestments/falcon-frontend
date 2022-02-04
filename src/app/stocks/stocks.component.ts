import { Component, OnInit, ViewChild } from '@angular/core';
import { StocksService } from '../stock.service';
import { Stock } from '../stock.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-mutual-funds',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  isLoadingStocks: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) dataSource!: MatTableDataSource<Stock>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private stockService: StocksService,
    private _liveAnncouncer: LiveAnnouncer
  ) {}

  mutualFunds: Stock[] = [];

  ngOnInit(): void {
    this.stockService.getStocks().subscribe((payload) => {
      this.isLoadingStocks = true;
      // this.mutualFunds = payload;
      this.dataSource = new MatTableDataSource(payload);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingStocks = false;
    });
  }

  columns = [
    {
      columnDef: 'stockName',
      header: 'Stock Name',
      sortBy: 'Sort by header',
      cell: (element: any) => `${element.name}`,
    },
    {
      columnDef: 'symbol',
      header: 'Symbol',
      sortBy: 'Sort by symbol',
      cell: (element: any) => `${element.symbol}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      sortBy: 'Sort by Price',
      cell: (element: any) => `${element.price}`,
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);
  // dataSource = this.mutualFunds;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnncouncer.announce(`Sorted${sortState.direction}ending`);
    } else {
      this._liveAnncouncer.announce('Sorting cleared');
    }
  }
}
