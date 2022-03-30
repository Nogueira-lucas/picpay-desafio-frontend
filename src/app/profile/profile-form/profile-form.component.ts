import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '@core/account.service';
import { NotificationService } from '@core/notification.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'pf-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  hide = true;
  profileFormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private _authService: AuthService,
    private _accountService: AccountService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.profileFormGroup.patchValue({
      ...this._authService.getUserData()
    });
  }

  edit() {
    if (!this.profileFormGroup.valid) {
      this._notificationService.open('Todos os campos são obrigatórios.');
      return;
    }

    const { password, confirmPassword } = this.profileFormGroup.value;

    if (password !== confirmPassword) {
      this._notificationService.open('Os campos de senha não conferem.');
      return;
    }

    const { name, email } = this.profileFormGroup.value;
    
    this._accountService.updateAccount({
      ...this._authService.getUserData(),
      name: name,
      email: email,
      password: password
    })
      .pipe(take(1))
      .subscribe(_ => {
        this._notificationService.open('Informações do perfil atualizadas com sucesso!');
      }, _ => this._notificationService.open('Ocorreu um erro ao tentar atualizar dados do perfil.'));
  }

}
