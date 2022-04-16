import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent, FilterComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  exports: [HeaderComponent, FilterComponent],
})
export class SharedModule {}
