import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './modules/auth/pages/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "payments",
    canActivateChild:[AuthGuard],
    loadChildren: () => import("./modules/payments/payments.module").then(m=>m.PaymentsModule),
  },
  {
    path: "error",
    loadChildren: () => import("./modules/errors/errors.module").then(m=>m.ErrorsModule),
  },
  {
    path: "**",    
    redirectTo:"error/404"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
