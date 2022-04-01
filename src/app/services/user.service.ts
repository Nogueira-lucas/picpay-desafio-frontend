import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getUsers(email: string, password:string): Observable<User[]> {
    return this.http.get<User[]>(`${this.API}/account?email=${email}&password=${password}`);
  }
}
