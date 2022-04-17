import { Component, OnDestroy, OnInit } from "@angular/core";
import { AccountService } from "../_services/account.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from 'rxjs/operators';
import { Subscription } from "rxjs";

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    loading = false;

    account$: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get formControls() { return this.loginForm.controls; }

    onSubmit() {
        this.account$ = this.accountService.login(this.formControls.email.value, this.formControls.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    console.error(error);
                    this.loading = false;
                }
            });
    }

    ngOnDestroy() {
        if (this.account$ != null) this.account$.unsubscribe();
    }
}