import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

const routes: Routes = [
  //create one route login and one main that needs authguard authentication
  {
    path: '',
    loadChildren: () => import('./pages/components/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'main',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./pages/components/main/main.module').then( m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
