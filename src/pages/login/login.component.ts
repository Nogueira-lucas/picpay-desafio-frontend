import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AccountService } from 'src/core/services/account/account.service';
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
    private router: Router
  ) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {


  }

  login() {

    this.accountService.login(this.emailFormControl.value, this.passwordFormControl.value).pipe(
      catchError(() => [])
    )
      .subscribe(result => {
        if (result && result.length && result.length > 0) {
          sessionStorage.setItem('access_token', 'oiqwue37767432&%HWEQW');
          this.router.navigate(['/task']);
        }
      });
  }

}
