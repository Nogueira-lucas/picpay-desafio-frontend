import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { UserState } from "../state/user.state";

@Injectable()
export class UserFacade {

  constructor(private userService: UserService, private userState: UserState, private router: Router) { }

  getUser(): User {
    return this.userState.getUser();
  }

  login(email: string, password:string) {
    return this.userService.getUsers(email, password)
        .pipe(tap(users => this.userState.setUser(users[0])))
  }

  logout() {
      this.userState.removeUser();
      this.router.navigate(['auth']);
  }
}