import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../core/Interceptor/auth-guard'

import { LoginComponent } from './login/login.component'
import { PagesComponent } from './pages.component'
import { PaymentsComponent } from './payments/payments.component'
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app', component: PagesComponent, canLoad: [AuthGuard], canActivate: [AuthGuard], children:
      [
        { path: 'payments', component: PaymentsComponent },
        { path: 'profile', component: ProfileComponent },
        { path: '', redirectTo: 'payments', pathMatch: 'full' }
      ]
  },
  { path: '**', redirectTo: 'app' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
