import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStatusComponent } from './transaction-status.component';



@NgModule({
  declarations: [
    TransactionStatusComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TransactionStatusComponent
  ]
})
export class TransactionStatusModule { }
