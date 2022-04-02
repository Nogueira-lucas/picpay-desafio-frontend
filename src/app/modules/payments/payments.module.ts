import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { DeletePaymentComponent } from './components/delete-payment/delete-payment.component';
import { EditPaymentComponent } from './components/edit-payment/edit-payment.component';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ListComponent } from './pages/list/list.component';
import { PaymentsRoutingModule } from './payments-routing.module';

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
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class PaymentsModule {}
