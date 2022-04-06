import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserState {
  private user$ = new BehaviorSubject<User>(null);

  getUser() {
    return this.user$.value;
  }

  getUserStorage(): User {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) as User : null;
  }

  setUser(user: User) {
    this.user$.next(user);
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    this.user$.next(null);
    sessionStorage.removeItem('user');
  }
}
