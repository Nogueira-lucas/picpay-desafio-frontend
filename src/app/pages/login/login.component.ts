import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  showLoginError: boolean = false;
  errorMessage: any;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  get f() { return this.loginForm.controls; }

  doLogin() {
    this.showLoginError = false;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(
      result => {
        if (result) {
          if (result.success == false) {
            this.handleError(result.message);
            return;
          }
          this.router.navigate(["/"]);
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
      });

  }

  handleError(errorMessage: string) {
    this.errorMessage = errorMessage;
    this.showLoginError = true;

    setTimeout(() => {
      this.showLoginError = false;
    }, 6000);
  }

}
