import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainComponent  
  },
];

export const MainRoutingModule = RouterModule.forChild(routes);
