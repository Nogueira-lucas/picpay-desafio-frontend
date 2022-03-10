import { PageBuildComponent } from './page-build.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

export const routes: Routes = [
  {
  path: '',
  component: PageBuildComponent,
  children: [
    {
      path: '',
      loadChildren: () =>
        import(`../tasks/tasks.module`).then((m) => m.TasksModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'login',
      loadChildren: () =>
        import(`../login/login.module`).then((m) => m.LoginModule),
    }
  ]
},
{
  path: '**',
  loadChildren: () =>
    import(`../not-found/not-found.module`).then((m) => m.NotFoundModule),
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageBuildRoutingModule { }
