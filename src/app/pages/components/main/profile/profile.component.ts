import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { AuthService } from './../../../../../core/services/auth.service';
import { TasksService } from './../../../../../core/services/tasks.service';
import { LocalStorageService } from './../../../../../core/services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

@UntilDestroy()
export class ProfileComponent implements OnInit {

  user: any = {
    id: 0,
    name: '',
    email: '',
    password: ''
  }
  pagamentos: any = {
    total: 0,
    pagas: 0,
    pendentes: 0
  };

  userLogged: any;
  userName: string = '';
  errorMessage: string = '';
  errorMessageName: string = '';
  newPassword: string = '';

  constructor(
    private _localStorageService: LocalStorageService,
    private _tasksService: TasksService,
    private _authService: AuthService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getUser();
    this.getPayments();
  }

  getUser() {
    const id = JSON.parse(this._localStorageService.get('user')).id;
    this.userLogged = this._authService.getUserById(id).pipe(untilDestroyed(this)).subscribe((user: any) => {
      this.user = user;
      this.userName = user.name;
    });
  }

  getPayments() {
    this._tasksService.getTasks().subscribe((payments: any) => {
      this.pagamentos.total = payments.length;
    });
  }

  updateUser() {
    this.validatePassword();
    this._authService.updateUser(this.user).pipe(untilDestroyed(this)).subscribe((user: any) => {
      this._localStorageService.set('user', {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email
      });
      this._router.navigate(['/main']);
    });
  }

  validatePassword(): void {
    if (this.newPassword.length >= 6) {
      this.errorMessage = '';
      this.user.password = this.newPassword;
    }
    else if (this.newPassword.length == 0) {
      this.errorMessage = '';
    }
    else if (this.newPassword.length < 6) {
      this.errorMessage = 'Senha deve ter 6 caracteres, senha vazia irá manter a atual';
    }
  }

  validateName(){
    if(this.user.name.length == 0){
      this.errorMessageName = 'Usuário não pode ser vazio';
    }
    else{
      this.errorMessageName = '';
    }
  }
}
