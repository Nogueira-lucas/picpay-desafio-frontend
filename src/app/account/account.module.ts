import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { PayButtonComponent } from '../_components/button/pay-button.component';
import { PayInputComponent } from '../_components/input/pay-input.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        LoginComponent,
        PayButtonComponent,
        PayInputComponent
    ]
})
export class AccountModule { }