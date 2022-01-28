import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { StockService } from '../stock.service';




@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  stockSearched: any = null;
  constructor(

    private stockService:StockService
  ) { }

  ngOnInit(): void {
  }
  
  

   onSubmit(form: NgForm) {
    this.stockService.findStock(form.value).subscribe((res) => {
      this.stockSearched = res
    });
  }
}

