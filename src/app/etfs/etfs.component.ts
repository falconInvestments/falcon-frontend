import { Component, OnInit } from '@angular/core';
import { Etf } from '../etf.model';
import { EtfService } from '../etf.service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-etfs',
  templateUrl: './etfs.component.html',
  styleUrls: ['./etfs.component.scss']
})
export class EtfsComponent implements OnInit {

  dataSource = new MatTableDataSource<Etf>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  etfs: Etf[] = [];
  displayedColumns: string[] = ['name', 'ticker', 'asset', 'price', 'portfolio' ]


  constructor(private eftService: EtfService) { }

  ngOnInit(): void {
    this.eftService.getEtfs().subscribe((res) => {
      // this.etfs = res;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  nextStep() {
    console.log("hello")
  }

}
