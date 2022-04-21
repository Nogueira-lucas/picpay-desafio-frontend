import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PaymentComponent } from './payment.component';
import { PaymentListComponent } from './list/payment-list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        PaymentComponent,
        PaymentListComponent
    ],
    exports: [
        PaymentComponent,
        PaymentListComponent
    ]
})
export class PaymentModule { }