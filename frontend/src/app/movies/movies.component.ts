import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { MoviesService } from '../services/movies.service';
import { tap, shareReplay, switchMap, map, distinctUntilChanged, filter, startWith } from 'rxjs/operators';
import { IMovie, IReservation } from '../services/common';
import { Observable, combineLatest, ReplaySubject } from 'rxjs';
import { EventEmitter } from 'events';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservationsService } from '../services/reservations.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movie_ent: IMovie;
  reservation_ent: IReservation;
  selectDate = new ReplaySubject<{ startDate: moment.Moment, endDate: moment.Moment }>(1);
  ranges: any = {
    'Hoy': [moment().utc(true), moment().utc(true)],
    'Ayer': [moment().utc(true).subtract(1, 'days'), moment().utc(true).subtract(1, 'days')],
    'Ultimos 7 días': [moment().utc(true).subtract(6, 'days'), moment().utc(true)],
    'Ultimos 30 dias': [moment().utc(true).subtract(29, 'days'), moment().utc(true)],
    'Este mes': [moment().utc(true).startOf('month'), moment().utc(true).endOf('month')],
    'Ultimo mes': [moment().utc(true).subtract(1, 'month').startOf('month'), moment().utc(true).subtract(1, 'month').endOf('month')]
  };
  movies$: Observable<IMovie[]>;
  constructor(private movieService: MoviesService, public dialog: MatDialog) {
  }

  ngOnInit() {
    const mom = moment().utc(true);
    this.movies$ = this.selectDate.pipe(shareReplay()).pipe(
      startWith({ startDate: mom, endDate: mom }),
      map(it => `init_date=${it.startDate.format('YYYY-MM-DD')}&end_date=${it.endDate.format('YYYY-MM-DD')}`),
      switchMap(it => this.movieService.getAllData(it).pipe(shareReplay())),
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogMovie, {
      data: this.movie_ent
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectDate.next({ startDate: moment().utc(true), endDate: moment().utc(true) });
      this.movie_ent = result;
    });
  }

  openReservationDialog(id: number): void {
    this.reservation_ent = {
      ...this.reservation_ent,
      movie_id: id,
    };
    const dialogRef = this.dialog.open(DialogReservation, {
      data: this.reservation_ent
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectDate.next({ startDate: moment(), endDate: moment() });
    });
  }

}

/**
 * Componente de guardado para la reservación dee películas
 */
@Component({
  selector: 'app-dialog-reservation',
  styleUrls: ['./movies.component.scss'],
  templateUrl: 'dialog-reservation.html',
})
export class DialogReservation implements OnInit {
  selectDateInternal = new ReplaySubject<{ startDate: moment.Moment, endDate: moment.Moment }>(1);
  reservationForm = new FormGroup({
    document: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    full_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogReservation>,
    @Inject(MAT_DIALOG_DATA) public data: IReservation,
    private reservationService: ReservationsService) {
  }


  ngOnInit(): void {

  }

  isValid(): boolean {
    return !(this.reservationForm.valid);
  }

  onSubmit(): void {
    this.data = <IReservation>{
      ...this.data,
      ...this.reservationForm.value,
      date: moment().utc(true)
    };
    this.reservationService.saveData(this.data).subscribe();
    this.reservationForm.reset();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


/**
 * Componente de dialogo para el guardado de películas
 */
@Component({
  selector: 'app-dialog-movie',
  styleUrls: ['./movies.component.scss'],
  templateUrl: 'dialog-movie.html',
})
export class DialogMovie implements OnInit {
  selectDateInternal = new ReplaySubject<{ startDate: moment.Moment, endDate: moment.Moment }>(1);
  movieForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image_url: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogMovie>,
    @Inject(MAT_DIALOG_DATA) public data: IMovie, private movieService: MoviesService) {
    }

  
  ngOnInit(): void {
    this.selectDateInternal.pipe(tap(it => {
      this.data.end_date = it.endDate.utc(true).toDate();
      this.data.init_date = it.startDate.utc(true).toDate();
    })).subscribe();
    
  }

  isValid(): boolean {
    return !(this.movieForm.valid && (typeof this.data.end_date !== 'undefined') && (typeof this.data.init_date !== 'undefined'));
  }

  onSubmit(): void {
    this.data = {
      ...this.movieForm.value,
      end_date: this.data.end_date,
      init_date: this.data.init_date
    };
    this.movieService.saveData(this.data).subscribe();
    this.movieForm.reset();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
