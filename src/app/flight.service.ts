import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private apiUrl = 'https://localhost:7186/api/DCXAir/journey';  // URL de tu API
  
  constructor(private http: HttpClient) { }

  // getFlights(): Observable<any> {
  //   console.log("url api: "+this.apiUrl); 
  //   return this.http.get<any>(this.apiUrl);
  // }

  getJourney(origin: string, destination: string, routeType: string = 'oneway'): Observable<any[]> {
    const params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('routeType', routeType);

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  // getFlights(origin: string, destination: string, currency: string, tripType: string): Observable<any> {
  //   const params = new HttpParams()
  //     .set('origin', origin)
  //     .set('destination', destination)
  //     .set('currency', currency)
  //     .set('tripType', tripType);

  //   return this.http.get<any>(this.apiUrl, { params });
  // }
}
