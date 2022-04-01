import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './components/modal/modal.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [HeaderComponent, ModalComponent, FilterComponent,],
  exports: [HeaderComponent, ModalComponent, FilterComponent,],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
