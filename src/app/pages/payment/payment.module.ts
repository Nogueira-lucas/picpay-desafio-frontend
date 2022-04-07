import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { PaymentRemoveComponent } from './components/payment-remove/payment-remove.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentFormComponent,
    PaymentRemoveComponent,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: PaymentListComponent }]),
    CommonModule,
    SharedModule,
    FormsModule,
    NgxDatatableModule,
    CurrencyMaskModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class PaymentModule { }
