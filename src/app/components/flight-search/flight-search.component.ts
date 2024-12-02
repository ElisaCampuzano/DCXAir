import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightService } from '../../flight.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent {
  flightForm!: FormGroup;
  flights: any[] = [];  // Para almacenar los vuelos obtenidos
  journeys: any[] = [];
  currencyArray: string[] = ["USD","COP","EUR"];

  constructor(private fb: FormBuilder, private flightService: FlightService) { }

  ngOnInit() {
    this.flightForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      currency: ['', Validators.required],
      tripType: ['oneway', Validators.required] 
    });
  }

  search() {
    this.getJourneys(this.flightForm.get('origin')?.value, this.flightForm.get('destination')?.value, this.flightForm.get('tripType')?.value);
    if (this.flightForm.valid) {
      const { origin, destination, currency, tripType } = this.flightForm.value;

      // this.flightService.getFlights().subscribe(
      //   (data) => {
      //     this.flights = data;
      //     console.log('Vuelos obtenidos:', this.flights);
      //   }
      // );

      // this.flightService.getFlights(origin, destination, currency, tripType).subscribe(
      //   (data) => {
      //     this.flights = data;  // Asumiendo que la API devuelve una lista de vuelos
      //     console.log('Vuelos obtenidos:', this.flights);
      //   },
      //   (error) => {
      //     console.error('Error al obtener los vuelos:', error);
      //   }
      // );
    }
  }

  getJourneys(origin: string, destination: string, routeType: string): void {
    let type = this.flightForm.get('tripType')?.value;
    console.log('Selected trip type:', type);
    // if (document.querySelector('input[name="optradio"]:checked').value;) {
    //   routeType = "oneway";
    // }
    // else if (this.flightForm.get('roundtrip')?.value !== "") {
    //   routeType = "roundtrip";
    // }
    this.flightService.getJourney(origin, destination, routeType).subscribe(
      (data) => {
        this.journeys = data;
        console.log('Vuelos obtenidos:', this.journeys);
      }
    )
  }

  clear(){
    console.log("clear");
    console.log(this.flightForm.get('currency')?.value);
    this.journeys = [];
  }
}
