import { Injectable } from '@angular/core';
import { StocksComponent } from './stocks/stocks.component'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  stocks: StocksComponent[] = []
  constructor() { }
  addToCart(stock: StocksComponent) {
    this.stocks.push(stock);
  }

  getItems() {
    return this.stocks;
  }

  clearCart() {
    this.stocks = [];
    return this.stocks;
  }
}
