import { UserEditModel } from './../../../../../core/model/user.model';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { AuthService } from './../../../../../core/services/auth.service';
import { TasksService } from './../../../../../core/services/tasks.service';
import { LocalStorageService } from './../../../../../core/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { LocationModel } from 'src/core/model/location.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

@UntilDestroy()
export class ProfileComponent implements OnInit {

  user: UserEditModel;
  pagamentos: any = {
    total: 0,
    pagas: 0,
    pendentes: 0
  };
  localization: LocationModel;
  userLogged: any;
  userName: string = '';
  errorMessage: string = '';
  errorMessageName: string = '';
  newPassword: string = '';
  loading: boolean = true;

  constructor(
    private _localStorageService: LocalStorageService,
    private _tasksService: TasksService,
    private _authService: AuthService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.loading = true;
    this.getUser();
    this.getPayments();
    this.getLocation();
  }

  getUser() {
    const id = JSON.parse(this._localStorageService.get('user'))?.id;
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

  getLocation(){
    this._authService.getLocation().pipe(untilDestroyed(this)).subscribe((location: any) => {
      this.localization = location;
      this.loading = false;
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
