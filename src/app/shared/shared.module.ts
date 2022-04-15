import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FilterComponent],
  imports: [CommonModule, FormsModule],
  exports: [HeaderComponent, FilterComponent],
})
export class SharedModule {}
