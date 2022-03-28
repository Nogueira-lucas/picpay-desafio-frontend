import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { NewUpdatePaymentComponent } from './pages/new-update-payment/new-update-payment.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { DeletePaymentComponent } from './pages/delete-payment/delete-payment.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};


@NgModule({
  declarations: [
    AdminComponent,
    PaymentsComponent,
    NewUpdatePaymentComponent,
    DeletePaymentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxPaginationModule,
    FilterPipeModule
  ]
})
export class AdminModule { }
