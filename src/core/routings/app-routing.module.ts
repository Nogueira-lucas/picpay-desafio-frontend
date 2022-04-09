import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from 'src/pages/error404/error404.component';
const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('../../pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'task',
    loadChildren: () => import('../../pages/task/task.module').then(m => m.TaskModule)
  },
  {
    path: '**', component: Error404Component
 }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
