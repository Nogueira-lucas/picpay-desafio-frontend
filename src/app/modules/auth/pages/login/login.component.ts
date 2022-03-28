import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public formAuth: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  public errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public submitForm() {
    if (this.formAuth.invalid) {
      return;
    }

    this.authService
      .sign({
        email: this.formAuth.value.email,
        password: this.formAuth.value.password,
      })
      .subscribe({
        next: (res) => this.router.navigate(['payments']),
        error: (err) => (this.errorMessage = err),
      });
  }
}
