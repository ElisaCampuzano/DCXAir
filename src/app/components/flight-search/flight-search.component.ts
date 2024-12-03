import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightService } from '../../flight.service';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css',
  providers: [DecimalPipe]
})
export class FlightSearchComponent {
  flightForm!: FormGroup;
  flights: any[] = [];
  journeys: any[] = [];
  currencyArray: string[] = ["USD", "COP", "EUR"];
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private flightService: FlightService, private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.flightForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      currency: ['', Validators.required],
      tripType: ['oneway', Validators.required]
    });
  }

  search() {
    this.errorMessage = "";
    this.journeys = [];
    let origin = this.flightForm.get('origin')?.value;
    let destination = this.flightForm.get('destination')?.value;
    let tripType = this.flightForm.get('tripType')?.value;
    let currency = this.flightForm.get('currency')?.value
    this.getJourneys(origin, destination, tripType, currency);
    if (this.flightForm.valid) {
      const { origin, destination, currency, tripType } = this.flightForm.value;
    }
  }

  getJourneys(origin: string, destination: string, routeType: string, currency: string): void {
    this.errorMessage = "";
    this.flightService.getJourney(origin, destination, routeType, currency).subscribe(
      (data) => {
        this.journeys = data;
      },
      (error) => {
        this.errorMessage = "No outbound flights found for the specified origin and destination";
      }
    );
  }

  formatPrice(price: number): string {
    return this.decimalPipe.transform(price, '1.0-0') || '';
  }

  getAll() {
    this.flightService.getFlights().subscribe(
      (data) => {
        this.journeys = data;
      },
      (error) => {
        this.errorMessage = "No outbound flights found for the specified origin and destination";
      }
    );
  }

  clear() {
    this.errorMessage = "";
    this.journeys = [];
  }
}
