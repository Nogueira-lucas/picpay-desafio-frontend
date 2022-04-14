import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PaymentListComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class PaymentModule {}
