import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = this.getUserFromStorage();

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {}

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
    this.notificationService.showSuccess('Deslogado com sucesso.');
  }

  getUsers(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API}/account?email=${email}&password=${password}`);
  }

  login(username, password) {
    this.getUsers(username, password).subscribe(users => {
      if (users.length) {
        this.setUser(users[0]);
        this.router.navigate(['/payments']);
      } else {
        console.log('lols');
        this.notificationService.showError('Email ou senha incorretos.');
      }
    });
  }
}
