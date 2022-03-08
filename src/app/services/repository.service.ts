import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../shared/components/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  currentUrl = window.location.href
  api = environment.baseApi;
  constructor(
    private http: HttpClient, 
    public _router: Router, 
    public alert: AlertService){}

  get(params: string, url = this.api): Observable<any> {  
    return this.http.get<any>(`${url}${params}`, {observe: 'response'}).pipe(
      map(res => {
        return res;
      })
    );
  }

  post(params: string, data: any, url = this.api): Observable<any> {
    return this.http.post<any>(`${url}${params}`, data).pipe(
      map(res => { return res; })
    );
  }

  put(params: string, data: any, url = this.api): Observable<any> {
    return this.http.put<any>(`${url}${params}`, data).pipe(
      map(res => { return res; })
    );
  }

  delete(params: string, url = this.api): Observable<any> {
    return this.http.delete<any>(`${url}${params}`).pipe(
      map(res => { return res; })
    );
  }
}
