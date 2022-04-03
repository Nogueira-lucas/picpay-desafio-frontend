import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MaterialModule } from "../../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { DeletePaymentComponent } from "./components/delete-payment/delete-payment.component";
import { EditPaymentComponent } from "./components/edit-payment/edit-payment.component";
import { NewPaymentComponent } from "./components/new-payment/new-payment.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { ListComponent } from "./pages/list/list.component";
import { PaymentsRoutingModule } from "./payments-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    TaskListComponent,
    NewPaymentComponent,
    DeletePaymentComponent,
    EditPaymentComponent,
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PaymentsModule {}
