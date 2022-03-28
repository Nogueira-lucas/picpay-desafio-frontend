import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { PaymentsComponent } from './pages/payments/payments.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', component: PaymentsComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
