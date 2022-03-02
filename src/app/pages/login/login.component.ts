import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  loginInvalid: boolean;

  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.loginInvalid = false
  }

  onSubmit() {
    if (!this.userForm.valid) return

    let userData: User = this.userForm.value;

    this.userService.login(userData).subscribe(resp => {
      if (!resp.length) {
        this.loginInvalid = true
      }
    })
  }

  private createForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
