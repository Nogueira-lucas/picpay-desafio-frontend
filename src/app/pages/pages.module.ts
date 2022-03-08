import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PaymentsComponent } from './payments/payments.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablePaymentsComponent } from './payments/table-payments/table-payments.component';
import { FormPaymentsComponent } from './payments/form-payments/form-payments.component';



@NgModule({
  declarations: [
    PagesComponent,
    LoginComponent,
    PaymentsComponent,
    ProfileComponent,
    TablePaymentsComponent,
    FormPaymentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
