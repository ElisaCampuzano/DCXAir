import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private apiUrl = environment.apiUrl; 
  private apiUrlJourney = environment.apiUrlJourney; 
  
  constructor(private http: HttpClient) { }

  getFlights(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getJourney(origin: string, destination: string, routeType: string = 'oneway', currency: string = 'USD'): Observable<any[]> {
    const params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('routeType', routeType)
      .set('currency', currency);

    return this.http.get<any[]>(this.apiUrlJourney, { params });
  }
}
