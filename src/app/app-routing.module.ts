import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PageLayoutComponent } from './layouts/page-layout/page-layout.component';

const appRoutes: Routes = [
    {
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full',
    },
    {
      path: 'auth', component: AuthLayoutComponent, data: { title: 'auth Views' },
      children: [
        { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }
      ]
    },
    {
      path: 'page', component: PageLayoutComponent, data: { title: 'page Views' }, canActivate: [AuthGuard],
      children: [
        { path: 'payments', loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule) }
      ]
    },
    { path: '**', redirectTo: '/auth' }
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'disabled', relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
  })

  export class AppRoutingModule {

  }
