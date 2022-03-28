import { AlertComponent } from './../../components/alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/pages/login/login.component';
import { NotfoundComponent } from 'src/app/components/notfound/notfound.component';
import { PaymentsComponent } from 'src/app/pages/payments/payments.component';

const router: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'payments', component: PaymentsComponent },
  {path: 'alert', component: AlertComponent},
  { path: '404', component: NotfoundComponent },  
  { path: '**', redirectTo: '404' },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(router)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
