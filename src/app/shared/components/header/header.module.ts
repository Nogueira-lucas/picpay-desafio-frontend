import { TransactionStatusModule } from './../transaction-status/transaction-status.module';
import { SharedModule } from '../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionStatusModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
