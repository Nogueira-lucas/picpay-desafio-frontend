import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentRemoveComponent } from './components/payment-remove/payment-remove.component'

@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentFormComponent,
    PaymentRemoveComponent,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: PaymentListComponent }]),
    CommonModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule
  ]
})
export class PaymentModule { }
