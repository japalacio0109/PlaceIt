import { Component, OnInit } from '@angular/core';
import { IReservation } from '../services/common';
import { ReplaySubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { shareReplay, startWith, map, switchMap } from 'rxjs/operators';
import { ReservationsService } from '../services/reservations.service';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  selectDate = new ReplaySubject<{ startDate: moment.Moment, endDate: moment.Moment }>(1);
  ranges: any = {
    'Hoy': [moment().utc(true), moment().utc(true)],
    'Ayer': [moment().utc(true).subtract(1, 'days'), moment().utc(true).subtract(1, 'days')],
    'Ultimos 7 días': [moment().utc(true).subtract(6, 'days'), moment().utc(true)],
    'Ultimos 30 dias': [moment().utc(true).subtract(29, 'days'), moment().utc(true)],
    'Este mes': [moment().utc(true).startOf('month'), moment().utc(true).endOf('month')],
    'Ultimo mes': [moment().utc(true).subtract(1, 'month').startOf('month'), moment().utc(true).subtract(1, 'month').endOf('month')]
  };
  displayedColumns: string[] = ['movie', 'full_name', 'email', 'document', 'phone'];

  reservations$: Observable<IReservation[]>;
  constructor(private reservationService: ReservationsService) { }

  ngOnInit() {
    const mom = moment().utc(true);
    this.reservations$ = this.selectDate.pipe(shareReplay()).pipe(
      startWith({ startDate: mom, endDate: mom }),
      map(it => `init_date=${it.startDate.format('YYYY-MM-DD')}&end_date=${it.endDate.format('YYYY-MM-DD')}`),
      switchMap(it => this.reservationService.getAllData(it).pipe(shareReplay())),
    );
  }

}
