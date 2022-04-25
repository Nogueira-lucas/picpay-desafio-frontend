import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService as UserService } from "../../_services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from 'rxjs/operators';
import { Subscription } from "rxjs";
import { ButtonConfig } from "src/app/_components/button/button-config";
import { InputConfig } from "src/app/_components/input/input-config";
import { NotifierService } from 'angular-notifier';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    loading = false;

    user$: Subscription;

    loginButtonConfig: ButtonConfig;

    emailInputConfig: InputConfig;
    passwordInputConfig: InputConfig;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private notifierService: NotifierService
    ) { }

    ngOnInit(): void {
        this.setupForm()
    }

    get f() { return this.loginForm.controls; }

    setupForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginButtonConfig = {
            label: 'Entrar',
            type: 'primary'
        }

        this.emailInputConfig = {
            label: 'Email',
            controlName: 'email',
            type: 'text'
        }

        this.passwordInputConfig = {
            label: 'Senha',
            controlName: 'password',
            type: 'password'
        }
    }

    onSubmit() {
        if (this.f.email.value === '' || this.f.password.value === '') {
            this.notifierService.notify("warning", "E-mail e senha obrigatórios")
            throw Error("Campos obrigatórios não preenchidos")
        }

        this.loading = true;

        this.user$ = this.userService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                    this.loading = false;
                },
                error: error => {
                    console.error(error);
                    this.loading = false;
                }
            });

    }

    ngOnDestroy() {
        if (this.user$ != null) this.user$.unsubscribe();
    }
}