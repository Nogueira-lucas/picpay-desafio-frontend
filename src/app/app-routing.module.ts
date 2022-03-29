import { AuthGuard } from './shared/guards/auth.guard';
import { NotfoundComponent } from './pages/not-found/components/notfound/notfound.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const router: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule) },
    {
        path: 'payments',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/payments/payments.module').then((m) => m.PaymentsModule),
    },
    { path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule) },
    { path: '**', redirectTo: '404' },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forRoot(router)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
