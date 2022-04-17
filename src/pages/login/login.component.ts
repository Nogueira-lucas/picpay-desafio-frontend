import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import UserLogin from 'src/models/user-login.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('insertRemoveErrorMessageTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
  ],
})
export class LoginComponent implements OnInit {

  passIsHide: boolean = true;  
  userLoginFormGroup: FormGroup;
  usernameFormControl = new FormControl('', [Validators.required,]);
  passwordFormControl = new FormControl('', [Validators.required,]);

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    
  ) { 
    this.userLoginFormGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }

  ngOnInit(): void {  
  }
  
  showHidePass() {
    this.passIsHide = !this.passIsHide
  }
  
  userLoginFormGroupHasError(control: any, error: string) {
    return this.userLoginFormGroup.controls[control].hasError(error);
  }

  goToPayments(){
    this.router.navigate(["home"])
  }

  login(){
    const login: UserLogin = {
      email: this.userLoginFormGroup.controls['username'].value,
      password:  this.userLoginFormGroup.controls['password'].value
    }
    this.authService.login(login)
    console.log(localStorage)
    
    if(localStorage.length > 0){
      this.goToPayments()
    } else {
      this.userLoginFormGroup.setErrors({ unauthenticated: true });
    }

  }
}
