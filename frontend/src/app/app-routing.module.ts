import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ReservationsComponent } from './reservations/reservations.component';

export const routes: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
    data: { title: 'Películas', routeName: 'Peliculas' }
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
    data: { title: 'Reservaciones', routeName: 'Reservaciones' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
