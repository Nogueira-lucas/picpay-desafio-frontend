import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPaymentsRoutingModule } from './user-payments-routing.module';
import { UserPaymentsComponent } from './user-payments.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [UserPaymentsComponent],
  imports: [
    CommonModule,
    UserPaymentsRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ]
})
export class UserPaymentsModule { }
