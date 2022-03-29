import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    get email(): AbstractControl {
        return this.loginForm.get('email');
    }

    get password(): AbstractControl {
        return this.loginForm.get('password');
    }

    constructor(private authService: AuthService, private router: Router) {
        this.createLoginForm();
    }

    ngOnInit(): void {
        this.clearSessionStorage();
    }

    login() {
        this.loginForm.markAllAsTouched();
        this.loginForm.updateValueAndValidity();

        if (this.loginForm.invalid) {
            return;
        }

        const login = this.loginForm.getRawValue();
        this.authService.login(login.email, login.password).subscribe((user) => {
            if (!user) {
                return;
            }
            this.router.navigate(['payments']);
        });
    }

    private createLoginForm(): void {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
                Validators.minLength(5),
                Validators.maxLength(100),
            ]),
            password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
        });
    }

    private clearSessionStorage(): void {
        sessionStorage.clear();
    }
}
