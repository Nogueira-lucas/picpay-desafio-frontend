import { NgxMaskModule } from 'ngx-mask';
import { customCurrencyMaskConfig, SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTaskComponent } from './edit-task.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  exports: [EditTaskComponent],
  providers: [
  ]
})
export class EditTaskModule { }
