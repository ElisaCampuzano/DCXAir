import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AppModule { }
