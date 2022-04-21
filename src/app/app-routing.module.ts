import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const userModule = () => import('./user/user.module').then(x => x.UserModule);
const homeModule = () => import('./home/home.module').then(x => x.HomeModule);

const routes: Routes = [
    { path: '', loadChildren: homeModule, canActivate: [AuthGuard] },
    { path: 'user', loadChildren: userModule },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }