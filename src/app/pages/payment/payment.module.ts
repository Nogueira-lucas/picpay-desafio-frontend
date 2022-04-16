import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { PortuguesePaginatorIntl } from './components/payment-list/paginator-ptBr';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PaymentDeleteComponent } from './components/payment-delete/payment-delete.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};

@NgModule({
  declarations: [PaymentListComponent, PaymentFormComponent, PaymentDeleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    CurrencyMaskModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PortuguesePaginatorIntl },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ],
})
export class PaymentModule {}
