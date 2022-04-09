import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from 'src/pages/task/task.component';
import { TaskGuard } from '../guards/task.guard';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    canActivate: [TaskGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class TaskRoutingModule { }
