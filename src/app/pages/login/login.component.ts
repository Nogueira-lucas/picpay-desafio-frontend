import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserFacade } from 'src/app/facade/user.facade';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;
  subscription: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private userFacade: UserFacade) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  login(loginData: User) {
    this.submitted = true;

    if (this.form.invalid) { return; }
    const { username, password } = loginData;

    this.subscription = this.userFacade.login(username, password).subscribe(
      users => {
        if (users) { this.router.navigateByUrl('/page/payments'); }
      },
      error => console.error(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
