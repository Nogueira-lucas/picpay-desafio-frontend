import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentListComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PaymentModule {}
