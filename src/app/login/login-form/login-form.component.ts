import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@core/account.service';
import { AccountModel } from '@models/account.model';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'pf-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  hide = true;
  loginFormGroup = new FormGroup({
    email: new FormControl('usuario@gmail.com', [
      Validators.required
    ]),
    password: new FormControl('usuario', [
      Validators.required
    ]),
  });

  constructor(
    private _accountService: AccountService,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this._accountService.getAccounts()
      .pipe(take(1))
      .subscribe((accounts: Array<AccountModel>) => {
        const { email, password } = this.loginFormGroup.value;
        const account = accounts.find(a => a.email == email && a.password == password);

        if (account)
          this.redirectToApplication(account);
        else
          this._snackBar.open('Usuário ou senha incorretos!');
      }, (err) => {
        this._snackBar.open('Não foi possível efetuar o login!');
      });
  }

  redirectToApplication(account: AccountModel) {
    this._authService.authenticate(account);
    this.router.navigateByUrl('/tasks');
    this._snackBar.open('Login efetuado com sucesso!');
  }
}
