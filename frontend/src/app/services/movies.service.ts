import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IMovie } from './common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl = 'movies';
  constructor(
    private core: CoreService
    ) { }
  

  public getAllData(params: string) {
    return this.core.getAllData<IMovie[]>(this.baseUrl, params).pipe(shareReplay());
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
