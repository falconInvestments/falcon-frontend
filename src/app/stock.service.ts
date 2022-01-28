import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  findStock(formValues: any): Observable<any> {
    const stock = {
      symbol: formValues.symbol,
      date: formValues.date,

    };

    return this.http.get(`https://api.polygon.io/v1/open-close/${stock.symbol}/${stock.date}?adjusted=true&apiKey=lMnC0fGVROfB2pPYLnH97iyDxzqtlD8z`);
}
}
