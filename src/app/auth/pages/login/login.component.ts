import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup
  typePassword = 'password'

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.formLogin.valid) {
      if (this.formLogin.get('email')?.value == 'usuario@gmail.com' && this.formLogin.get('password')?.value == 'usuario') {
        this.router.navigate(['/admin'])
      } else {
        this.formLogin.reset()
        this.toastr.error('E-mail ou senha incorreto')
      }
    } else {
      this.formLogin.markAllAsTouched()
      this.toastr.error('Preencha todos os campos')
    }
  }

  changePassword() {
    this.typePassword == 'password' ? this.typePassword = 'text' : this.typePassword = 'password'
  }
}
