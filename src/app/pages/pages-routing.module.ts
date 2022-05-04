import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authguard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./login/login.module')
          .then(m => m.LoginModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('./payments/payments.module')
          .then(m => m.PaymentsModule),
          canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
