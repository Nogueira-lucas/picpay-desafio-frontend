import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = this.getUserFromtorage();

  constructor(private http: HttpClient) {}

  getUserFromtorage(): User {
    const user = sessionStorage.getItem('user');
    return user ? (JSON.parse(user) as User) : null;
  }

  setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    sessionStorage.removeItem('user');
  }

  login(username, password) {
    if (!this.getUserFromtorage()) {
      this.http.get<User[]>(`http://localhost:3000/account?email=${username}&password=${password}`).subscribe(users => {
        if (users.length) {
          this.setUser(users[0]);
        }
      });
    }
  }
}
