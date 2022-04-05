import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { User } from "../models/user.model";
import { NotificationService } from "../services/notification.service";
import { UserService } from "../services/user.service";
import { UserState } from "../state/user.state";

@Injectable()
export class UserFacade {

  constructor(private userService: UserService, 
              private userState: UserState, 
              private router: Router, 
              private notifyService: NotificationService) { }

  getUser() {
    return this.userState.getUser() ?? this.userState.getUserStorage();
  }

  login(email: string, password:string) {
    return this.userService.getUsers(email, password)
      .pipe(tap(users => {
        if(users?.length) {
          this.userState.setUser(users[0])
        } else {
          this.notifyService.showError("Email ou senha incorretos.", "Ops!")
        }
    }))
  }

  logout() {
      this.userState.removeUser();
      this.router.navigate(['auth']);
  }
}