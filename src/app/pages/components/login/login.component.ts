import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from './../../../../core/services/auth.service';
import { LocalStorageService } from './../../../../core/services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@UntilDestroy()
export class LoginComponent implements OnInit {

  loginForm = this._formBuilder.group(
    {
      emailFormControl: ['', [Validators.required, Validators.email]],
      senhaFormControl: ['', [Validators.required, Validators.minLength(6)]]
    });
 
  cadastroForm: FormGroup;

  matcher = new MyErrorStateMatcher();
  hide: boolean = true;
  emailErrorMessage: string = '';
  passwordErrorMessage: string = ''
  confirmPasswordErrorMessage: string = ''
  userExistsErrorMessage: string = ''
  userExists: boolean = false;
  guid: string = '';
  wrongPassword: boolean = false;
  openRegistrar: boolean = false;
  darkMode: boolean = false;
  submitted: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService, 
    private _localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private _router: Router, 
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    if(this._localStorageService.get('accessToken') && this._authService.isTokenValid()){
      this._router.navigate(['/main']);
    }

    this.cadastroForm = this._formBuilder.group({
      nameFormControl: ['', Validators.required],
      emailFormControl: ['', [Validators.required, Validators.email]],
      senhaFormControl: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenhaFormControl: ['', [ Validators.required ]]
    }, {
        validator: MustMatch('senhaFormControl', 'confirmaSenhaFormControl')
    });  
  }

  emailError(): boolean{
    if (this.loginForm.get('emailFormControl').hasError('required')) {
      this.emailErrorMessage = 'Campo obrigatório';
      return true;
    }
    else if (this.loginForm.get('emailFormControl').hasError('email')) {
      this.emailErrorMessage = 'Email inválido';
      return true;
    }
    else {
      this.emailErrorMessage = '';
      return false;
    }
  }

  passwordError(): boolean{
    if (this.loginForm.get('senhaFormControl').hasError('required')) {
      this.passwordErrorMessage = 'Campo obrigatório';
      this.wrongPassword = false;
      return true;
    }
    else if (this.loginForm.get('senhaFormControl').hasError('minlength')) {
      this.passwordErrorMessage = 'Mínimo de 6 caracteres';
      this.wrongPassword = false;
      return true;
    }
    else {
      this.passwordErrorMessage = '';
      return false;
    }
  }

  confirmPasswordError(): boolean{
    if (this.cadastroForm.get('confirmaSenhaFormControl').hasError('required')) {
      this.confirmPasswordErrorMessage = 'Campo obrigatório';
      this.wrongPassword = false;
      return true;
    }
    else if (this.cadastroForm.get('confirmaSenhaFormControl').hasError('minlength')) {
      this.confirmPasswordErrorMessage = 'Mínimo de 6 caracteres';
      this.wrongPassword = false;
      return true;
    }
    else if (this.cadastroForm.get('confirmaSenhaFormControl').value !== this.cadastroForm.get('senhaFormControl').value) {
      this.confirmPasswordErrorMessage = 'Senhas não conferem';
      this.wrongPassword = false;
      return true;
    }
    else {
      this.confirmPasswordErrorMessage = '';
      return false;
    }
  }

  toggleHide(): void {
    this.hide = !this.hide;
  }

  toggleRegistrar(): void{
    this.openRegistrar = !this.openRegistrar;
  }

  login(): void {
    this._authService.login()
    .pipe(untilDestroyed(this))
    .subscribe(
      (response: any) => {
        if(response.length > 0) {
          const userLogged = response.find(x => x.email == this.loginForm.value.emailFormControl && x.password == this.loginForm.value.senhaFormControl);
          if(userLogged){
            let token = this.generateGuid();
            let expirationTime = this._authService.generateExpirationTime();
            this._localStorageService.set('accessToken', token);
            this._localStorageService.set('expirationTime', expirationTime);
            this._localStorageService.set('user', {
              id: userLogged.id,
              name: userLogged.name,
              email: userLogged.email
            });
            this._router.navigate(['/main'])
          }
          else{
            this.wrongPassword = true;
          }
        }
        else{
          this.wrongPassword = true;
        }
        this.submitted = true;
      },
      (error) => {
        this.openSnackBar();
        this.submitted = true;
      }
    );
    this.submitted = true;
  }

  registrar(): void{
    let user = {
      name: this.cadastroForm.get('nameFormControl').value,
      email: this.cadastroForm.get('emailFormControl').value,
      password: this.cadastroForm.get('senhaFormControl').value
    }

    this._authService.getUsers().pipe(untilDestroyed(this)).subscribe(
      (response: any) => {
        if(response.length > 0) {
          if(response.find(x => x.email == user.email)){
            this.userExistsErrorMessage = 'Usuário já cadastrado!';
            this.userExists = true;
          }
          else{
            if(!this.userExists){
              this._authService.registrar(user)
              .pipe(untilDestroyed(this))
              .subscribe(
                (response: any) => {
                  let token = this.generateGuid();
                  let expirationTime = this._authService.generateExpirationTime();
                  this._localStorageService.set('accessToken', token);
                  this._localStorageService.set('expirationTime', expirationTime);
                  this._localStorageService.set('user', response);
                  this._router.navigate(['/main'])
                },
                (error) => {
                  this.openSnackBar();
                }
              );
            }
          }
        }
        this.submitted = true;
      }, error => {
        this.openSnackBar();
        this.submitted = true;
      })
      this.submitted = true;
  }
  
  generateGuid(): string{
    return this.guid = this._authService.generateGuid();
  }

  get confirmaSenhaFormControl() {
    return this.cadastroForm.get('confirmaSenhaFormControl');
  }

  get senhaFormControl(){
    return this.cadastroForm.get('senhaFormControl  ');
  }

  openSnackBar() {
    this._snackBar.open('Erro ao consultar usuários, tente novamente', 'Fechar', {
      duration: 4000,
    });
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}