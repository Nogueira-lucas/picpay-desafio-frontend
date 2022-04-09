import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { DialogRemoveTaskComponent } from './dialog-remove-task/dialog-remove-task.component';
import { MaterialModule } from 'src/core/material/material.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    DialogAddTaskComponent,
    DialogRemoveTaskComponent
  ],
  imports: [
    CommonModule,
    CurrencyMaskModule,
    MaterialModule
  ],
  exports: [
    DialogAddTaskComponent,
    DialogRemoveTaskComponent
  ],
  entryComponents: [
    DialogAddTaskComponent,
    DialogRemoveTaskComponent
  ]

})
export class DialogsModule { }
