import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentFormComponent,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: PaymentListComponent }]),
    CommonModule,
  ]
})
export class PaymentModule { }
