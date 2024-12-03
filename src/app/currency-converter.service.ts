import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  private apiUrlConvert = environment.apiUrlConvert;

  constructor(private http: HttpClient) {}

  convertCurrency(amount: number, from: string, to: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlConvert}?amount=${amount}&from=${from}&to=${to}`)
      .pipe(
        catchError(error => {
          console.error('Error during currency conversion:', error);
          return throwError('Could not convert currency. Please try again later.');
        })
      );
  }
}
