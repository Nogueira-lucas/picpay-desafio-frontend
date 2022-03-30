import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


import { SharedModule } from '../shared/shared.module';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ListComponent } from './pages/list/list.component';
import { PaymentsRoutingModule } from './payments-routing.module';

@NgModule({
  declarations: [ListComponent, TaskListComponent, NewPaymentComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
})
export class PaymentsModule {}
