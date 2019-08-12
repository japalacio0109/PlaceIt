import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent, DialogMovie, DialogReservation } from './movies/movies.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ReservationsComponent } from './reservations/reservations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaceItMaterialModule } from './material.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ReservationsComponent,
    DialogMovie,
    DialogReservation
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PlaceItMaterialModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDaterangepickerMd.forRoot()
  ],
  entryComponents: [DialogMovie, MoviesComponent, DialogReservation],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: []}],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
