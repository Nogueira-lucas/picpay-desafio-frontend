import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { PagesComponent } from './pages.component'
import { PaymentsComponent } from './payments/payments.component'

const routes: Routes = [{path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: PagesComponent, children:
    [
      { path: 'payments', component: PaymentsComponent },
      { path: 'profile', component: PaymentsComponent },
      { path: '', redirectTo: 'payments', pathMatch:'full' }
    ]
  },
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PagesRoutingModule { }
