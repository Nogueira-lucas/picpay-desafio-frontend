import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { MyPaymentsComponent } from '../pages/my-payments/my-payments.component';
import { LayoutComponent } from 'src/layout/layout.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';

const routes: Routes = [
    
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth/:page',
        component: LoginComponent
    },
    
    {
        path: '',
        component: LayoutComponent,
        children:[
            {
                path: 'home',
                component: MyPaymentsComponent,
                canActivate: [AuthGuard],
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', useHash: false })],
    exports: [RouterModule]
  })
export class AppRoutingModule { }