import { TableContentComponent } from './../table-content.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TableContentComponent,  
  }
];

export const TableContentRoutingModule = RouterModule.forChild(routes);
