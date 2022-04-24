import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { NgxPaginationModule } from 'ngx-pagination';
import { UserModule } from '../user/user.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PayModalModule,
        PayInputModule,
        PayButtonModule,
        FontAwesomeModule,
        SelectDropDownModule,
        NgxPaginationModule,
        UserModule
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