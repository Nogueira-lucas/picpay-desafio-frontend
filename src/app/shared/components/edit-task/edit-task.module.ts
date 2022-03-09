import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { CUSTOM_DATE_FORMATS } from './../../shared.module';
import { customCurrencyMaskConfig, SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTaskComponent } from './edit-task.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { MAT_DATE_FORMATS } from '@angular/material/core';



@NgModule({
  declarations: [
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  exports: [EditTaskComponent],
  providers: [
  ]
})
export class EditTaskModule { }
