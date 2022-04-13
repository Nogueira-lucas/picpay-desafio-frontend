import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { MyPaymentsComponent } from '../pages/my-payments/my-payments.component';
import { LayoutComponent } from 'src/layout/layout.component';


const routes: Routes = [
    
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: MyPaymentsComponent
    },
    
    /* {
        path: 'my',
        component: LayoutComponent,
        children:[
            {
                path: 'payments',
                component: MyPaymentsComponent
            },
        ]
    }, */
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', useHash: false })],
    exports: [RouterModule]
  })
export class AppRoutingModule { }