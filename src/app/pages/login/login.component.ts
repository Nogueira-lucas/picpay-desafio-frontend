import { Component } from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
const urlImage = '../../../assets/payfriends-image.png' 
// src/app/assets/payfriends-image.png

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }
@Component({
    selector: 'login-page',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    imageSrc: string = urlImage

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        senha: new FormControl('', [Validators.required])
    })

    matcher = new MyErrorStateMatcher();
}