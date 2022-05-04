import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [

  ]
})
export class PaymentsModule { }
