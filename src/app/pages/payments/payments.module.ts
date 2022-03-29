import { DeletePaymentComponent } from 'src/app/pages/payments/components/delete-payment/delete-payment.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentModalComponent } from 'src/app/pages/payments/components/payment-modal/payment-modal.component';
import { PaymentsService } from 'src/app/services/payments/payments.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
    declarations: [PaymentsListComponent, PaymentModalComponent, DeletePaymentComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        SharedModule,
        NgxCurrencyModule,
        RouterModule.forChild([{ path: '', component: PaymentsListComponent }]),
    ],
    providers: [PaymentsService],
    exports: [PaymentsListComponent, PaymentModalComponent, DeletePaymentComponent],
})
export class PaymentsModule {}
