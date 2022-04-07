import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { TaskRoutingModule } from 'src/core/routings/task-routing.module';
import { ToolbarModule } from 'src/components/toolbar/toolbar.module';
import { MaterialModule } from 'src/core/material/material.module';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ToolbarModule,
    MaterialModule
  ]
})
export class TaskModule { }
