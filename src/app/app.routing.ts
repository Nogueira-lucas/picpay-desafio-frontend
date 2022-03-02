import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard } from './services/guards/logged.guard';
import { LoggedOutGuard } from './services/guards/logged-out.guard';
import { PaymentsComponent } from './pages/payments/payments.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/shared/home/home.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
    {
        path: '', component: HomeComponent, canActivate: [LoggedGuard],
        children: [
            { path: '', component: PaymentsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }