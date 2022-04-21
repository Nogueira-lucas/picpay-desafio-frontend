import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PayButtonModule } from '../_components/button/pay-button.module';
import { PayModalModule } from '../_components/modal/pay-modal.module';
import { PayInputModule } from '../_components/input/pay-input.module';
import { PaymentModule } from '../payment/payment.module';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        PayButtonModule,
        PayModalModule,
        PayInputModule,
        PaymentModule
    ]
})
export class HomeModule { }