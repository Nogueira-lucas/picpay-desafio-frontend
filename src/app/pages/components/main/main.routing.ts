import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'pagamentos',
        loadChildren: () => import('./table-content/table-content.module').then(m => m.TableContentModule)
      },
      {
        path: '',
        redirectTo: 'pagamentos',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'pagamentos',
        pathMatch: 'full'
      }
    ]  
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const MainRoutingModule = RouterModule.forChild(routes);
