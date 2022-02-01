import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from "./stock.model"

const baseURL = "https://vg-express-router.herokuapp.com/api/stocks";

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  getStocks(): Observable<any> {
    return this.http.get(`${baseURL}`);
  }

  getStock(stock_id: number): Observable<any> {
    return this.http.get(`${baseURL}/${stock_id}`);
  }
  
  createStock(newStock: Stock): Observable<any>{
    return this.http.post(`${baseURL}/`, newStock);
  }

  
  deleteStock(stock_id: number): Observable<any> {
    return this.http.delete(`${baseURL}/${stock_id}`);
  }

  updateStock(stock: Stock): Observable<any>{
    return this.http.put(`${baseURL}/${stock.stock_id}`, stock);
  }
}
