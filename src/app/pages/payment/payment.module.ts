import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { PortuguesePaginatorIntl } from './components/payment-list/paginator-ptBr';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [PaymentListComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, MatPaginatorModule, MatTableModule, MatSortModule],
  providers: [{ provide: MatPaginatorIntl, useClass: PortuguesePaginatorIntl }],
})
export class PaymentModule {}
