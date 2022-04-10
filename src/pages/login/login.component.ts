import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AccountService } from 'src/core/services/account/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  hide = true;
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {


  }

  login() {

    this.accountService.login(this.emailFormControl.value, this.passwordFormControl.value).pipe(
      catchError(() => [])
    )
      .subscribe(result => {
        if (result && result.length && result.length > 0) {

          this.snackbar.open('Bem vindo de volta.', 'PayFriends', {
            duration: 6000,
            panelClass: ['blue-snackbar']
          });

          sessionStorage.setItem('access_token', result[0].token);
          this.router.navigate(['/task']);
        } else {
          this.snackbar.open('Usuário e/ou senha inválido(s).', 'PayFriends', {
            duration: 46000,
            panelClass: ['red-snackbar']
          });
        }
      });
  }

}
