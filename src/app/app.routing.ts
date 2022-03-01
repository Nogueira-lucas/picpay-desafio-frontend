import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsComponent } from './payments/payments.component';
import { PaymentListComponent } from './payments/payment-list/payment-list.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
    { path: 'payments', component: PaymentsComponent },
    { path: 'login', component: AuthComponent },
    { path: '', redirectTo: '/payments', pathMatch: 'full' },
    { path: '**', component: PaymentsComponent } // Rota coringa
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }