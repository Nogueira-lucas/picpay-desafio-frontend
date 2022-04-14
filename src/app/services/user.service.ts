import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = this.getUserFromStorage();

  constructor(private http: HttpClient, private router: Router) {}

  getUserFromStorage(): User {
    const user = sessionStorage.getItem('user');
    return user ? (JSON.parse(user) as User) : null;
  }

  isLoggedIn() {
    return this.getUserFromStorage();
  }

  setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    sessionStorage.removeItem('user');
  }

  login(username, password) {
    if (this.isLoggedIn()) {
      this.router.navigate(['/payments']);
    } else {
      this.http.get<User[]>(`${environment.API}/account?email=${username}&password=${password}`).subscribe(users => {
        if (users.length) {
          this.setUser(users[0]);
          this.router.navigate(['/payments']);
        }
      });
    }
  }
}
