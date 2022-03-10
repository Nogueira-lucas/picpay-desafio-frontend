import { BackgroundTemplateTypes } from './../../shared/interfaces/transaction-status.interface';
import { TransactionStatusService } from './../../shared/services/transaction-status/transaction-status.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private readonly transactionService: TransactionStatusService) { }

  ngOnInit(): void {
    this.authService.logout();
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

  onKeyEnter(e: Event) {
    e.preventDefault();
    this.onSubmit();
  }

  onSubmit() {
    if (this.form.invalid)
      return false;

    this.authService.login(this.form.controls.email.value, this.form.controls.password.value).subscribe(_ => {
      this.transactionService.hide();
      this.router.navigate(['/']);
    }, _ => this.transactionService.show('Não foi possível fazer login, verifique se os dados de e-mail e senha foram escritos corretamente.', BackgroundTemplateTypes.error))
  }
}
