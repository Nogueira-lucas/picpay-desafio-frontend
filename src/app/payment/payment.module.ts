import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PaymentComponent } from './payment.component';
import { PaymentListComponent } from './list/payment-list.component';
import { PaymentDeleteComponent } from './delete/payment-delete.component';
import { PayModalModule } from '../_components/modal/pay-modal.module';
import { PayButtonModule } from '../_components/button/pay-button.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PayModalModule,
        PayButtonModule
    ],
    declarations: [
        PaymentComponent,
        PaymentListComponent,
        PaymentDeleteComponent
    ],
    exports: [
        PaymentComponent,
        PaymentListComponent,
        PaymentDeleteComponent
    ]
})
export class PaymentModule { }