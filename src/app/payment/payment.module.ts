import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PaymentComponent } from './payment.component';
import { PaymentListComponent } from './list/payment-list.component';
import { PaymentDeleteComponent } from './delete/payment-delete.component';
import { PayModalModule } from '../_components/modal/pay-modal.module';
import { PayButtonModule } from '../_components/button/pay-button.module';
import { PaymentEditComponent } from './edit/payment-edit.component';
import { PayInputModule } from '../_components/input/pay-input.module';
import { PaymentAddComponent } from './add/payment-add.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PayModalModule,
        PayInputModule,
        PayButtonModule,
        FontAwesomeModule,
        NgxPaginationModule
    ],
    declarations: [
        PaymentComponent,
        PaymentListComponent,
        PaymentAddComponent,
        PaymentEditComponent,
        PaymentDeleteComponent
    ],
    exports: [
        PaymentComponent,
        PaymentListComponent,
        PaymentAddComponent,
        PaymentEditComponent,
        PaymentDeleteComponent
    ]
})
export class PaymentModule { }