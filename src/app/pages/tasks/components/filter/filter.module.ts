import { ReactiveFormsModule } from '@angular/forms';
import { customCurrencyMaskConfig, SharedModule } from '../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
  exports: [FilterComponent],
  providers: []
})
export class FilterModule { }
