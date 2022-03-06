import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import(`./pages/home/home.module`).then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
  path: 'login',
  loadChildren: () =>
  import(`./pages/login/login.module`).then((m) => m.LoginModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
