import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserState {
  private user$ = new BehaviorSubject<User>(null);

  getUser() {
    return this.user$.value;
  }

  setUser(user: User) {
    this.user$.next(user);
  }

  removeUser() {
      this.user$.next(null)
  }
}