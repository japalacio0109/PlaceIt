import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  baseUrl = environment.gateway;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  getAllData<s>(url: string, params: string) {
    url = this.baseUrl + (params ? `${url}?${params}` : url);
    return this.http.get<s>(url).pipe(shareReplay(1));
  }

  getDataById(url: string, id: number) {
    url = this.baseUrl + `${url}/${id}`;
    return this.http.get(this.baseUrl);
  }

  saveData(url: string, data: any) {
    url = this.baseUrl + url;
    return this.http.post(url, data, this.httpOptions);
  }

  updateData(url: string, data: any, id: number) {
    url = this.baseUrl + `${url}/${id}`;
    return this.http.patch(url, data, this.httpOptions);
  }

  deleteData(url: string, id: number) {
    url = this.baseUrl + `${url}/${id}`;
    return this.http.delete(url);
  }
}
