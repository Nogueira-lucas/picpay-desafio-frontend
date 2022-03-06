import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { isEmail } from 'src/app/shared/utils/validates';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: { email: FormControl, password: FormControl }

  constructor(private auth: AuthService) { }

  validateForm(): boolean {
    if (this.user.email.invalid || !isEmail(this.user.email.value))
      throw ("Campo e-mail inválido")
    else if (this.user.password.invalid)
      throw ("Campo senha inválido, mínimo 6 caracteres")
    else return true
  }

  onSubmit(e: Event, form: NgForm): void {
    e.preventDefault()
    this.user = form.form.controls as any

    if (!this.validateForm()) return

    this.auth.login(this.user.email.value, this.user.password.value);
  }
}
