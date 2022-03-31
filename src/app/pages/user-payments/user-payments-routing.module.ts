import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPaymentsComponent } from './user-payments.component';

const routes: Routes = [
  {
    path: '',
    component: UserPaymentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPaymentsRoutingModule { }
