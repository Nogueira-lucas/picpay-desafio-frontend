import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { PayButtonModule } from '../_components/button/pay-button.module';
import { PayInputModule } from '../_components/input/pay-input.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        PayButtonModule,
        PayInputModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class AccountModule { }