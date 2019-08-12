import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreService } from './core.service';
import { IReservation } from './common';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  baseUrl = 'reservations';

  constructor(
    private core: CoreService
  ) { }

  public getAllData(params: string) {
    return this.core.getAllData<IReservation[]>(this.baseUrl, params);
  }

  public getDataById(id: number): Observable<any> {
    return this.core.getDataById(this.baseUrl, id);
  }

  public saveData(data: any): Observable<any> {
    return this.core.saveData(this.baseUrl, data);
  }

  public updateData(data: any, id: number): Observable<any> {
    return this.core.updateData(this.baseUrl, data, id);
  }

  public deleteData(id: number) {
    return this.core.deleteData(this.baseUrl, id);
  }
}
