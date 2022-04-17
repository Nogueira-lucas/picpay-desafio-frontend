import { Component, OnInit } from "@angular/core";
import { User } from "@src/app/models/user-model";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { UserService } from "@src/app/services/user/user.service";
import { SnackBarService } from "@src/app/services/snackbar/snackbar.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginComponent implements OnInit {
  hide = true;
  user: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.user = new User();
  }

  login(loginForm: NgForm): void {
    this.userService.getUser(this.user).subscribe(
      (response) => {
        if (response[0]?.email) {
          this.user = response[0];
          localStorage.setItem("loggedUser", JSON.stringify(this.user));
          this.router.navigate(["my-payments"]);
        } else {
          this.snackBService.openSnackBar(
            "Usuário não encontrado",
            "Fechar",
            3000,
            "top"
          );
          loginForm.resetForm();
        }
      },
      (error) => {
        return throwError(error);
      }
    );
  }
}
