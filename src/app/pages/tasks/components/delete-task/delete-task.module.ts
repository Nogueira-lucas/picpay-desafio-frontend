import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteTaskComponent } from './delete-task.component';
import { SharedModule } from '../../../../shared/shared.module';



@NgModule({
  declarations: [
    DeleteTaskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [DeleteTaskComponent]
})
export class DeleteTaskModule { }
