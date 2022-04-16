import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { ModalPaymentComponent } from './modal-payment/modal-payment.component';

@NgModule({
  declarations: [LoginComponent, PaymentListComponent, ModalPaymentComponent],
  exports: [LoginComponent, PaymentListComponent],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule
  ]
})
export class OrganismsModule { }
