import { NgModule } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';
import {
    AuthGuardService as AuthGuard
} from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';

export const ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'tasks',
        component: TasksComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }